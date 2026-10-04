-- Takshaya: KYC applications, staff roles, row-level security and private KYC storage.
-- Run once in the Supabase SQL Editor (Project > SQL Editor). Safe to re-run.
-- Review before running on production data.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------
-- 1. Applications table (columns match what ReviewSubmit.jsx inserts)
-- ---------------------------------------------------------------
create table if not exists public.verification_applications (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  status              text not null default 'PENDING_REVIEW',

  legal_company_name  text,
  trade_brand_name    text,
  year_established    int,
  primary_industry    text,
  company_size        text,
  company_website     text,
  about_business      text,

  business_roles      jsonb not null default '[]'::jsonb,

  gstin               text,
  gst_status          text not null default 'PENDING',
  pan_number          text,
  pan_entity_type     text,
  pan_status          text not null default 'PENDING',
  udyam_number        text,
  udyam_status        text not null default 'PENDING',

  factory_addresses   jsonb not null default '[]'::jsonb,
  authorized_person   jsonb not null default '{}'::jsonb,

  submitted_at        timestamptz,
  created_at          timestamptz not null default now()
);

-- If the table already existed, make sure the review columns are present.
alter table public.verification_applications
  add column if not exists reviewed_by      uuid references auth.users(id),
  add column if not exists reviewed_at      timestamptz,
  add column if not exists rejection_reason text;

-- Allowed statuses. NOT VALID so existing rows are not re-checked.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'verification_applications_status_check'
  ) then
    alter table public.verification_applications
      add constraint verification_applications_status_check
      check (status in ('PENDING_REVIEW','UNDER_REVIEW','APPROVED','REJECTED','SUSPENDED'))
      not valid;
  end if;
end $$;

-- One live application per company account (the site also checks this, but the
-- database is what enforces it). If this fails, you have duplicate rows to clean up.
create unique index if not exists one_active_application_per_user
  on public.verification_applications (user_id)
  where status <> 'REJECTED';

-- ---------------------------------------------------------------
-- 2. Staff roles (Takshaya team). Managed only from the SQL Editor
--    or server code. No policies are created, so customers cannot
--    read or write this table.
-- ---------------------------------------------------------------
create table if not exists public.staff_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       text not null check (role in ('platform_admin','kyc_reviewer','operations','finance')),
  created_at timestamptz not null default now()
);

alter table public.staff_users enable row level security;

create or replace function public.can_review_kyc()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff_users
    where user_id = auth.uid()
      and role in ('platform_admin','kyc_reviewer')
  );
$$;

revoke all on function public.can_review_kyc() from public;
grant execute on function public.can_review_kyc() to authenticated;

-- ---------------------------------------------------------------
-- 3. Row-level security on applications
-- ---------------------------------------------------------------
alter table public.verification_applications enable row level security;

revoke all on public.verification_applications from anon;
grant select, insert, update on public.verification_applications to authenticated;

drop policy if exists "own application: read"   on public.verification_applications;
drop policy if exists "own application: submit" on public.verification_applications;
drop policy if exists "staff: read all"         on public.verification_applications;
drop policy if exists "staff: review"           on public.verification_applications;

-- A company sees only its own application.
create policy "own application: read"
  on public.verification_applications for select to authenticated
  using (user_id = auth.uid());

-- A company can submit only for itself, and only as "pending". It cannot
-- approve itself or set review fields. Customers have no update or delete policy.
create policy "own application: submit"
  on public.verification_applications for insert to authenticated
  with check (
    user_id = auth.uid()
    and status = 'PENDING_REVIEW'
    and gst_status = 'PENDING'
    and pan_status = 'PENDING'
    and udyam_status = 'PENDING'
    and reviewed_by is null
    and reviewed_at is null
    and rejection_reason is null
  );

-- Takshaya reviewers can read every application and change its status.
create policy "staff: read all"
  on public.verification_applications for select to authenticated
  using (public.can_review_kyc());

create policy "staff: review"
  on public.verification_applications for update to authenticated
  using (public.can_review_kyc())
  with check (public.can_review_kyc());

-- ---------------------------------------------------------------
-- 4. Private storage for KYC documents (used by the upload step)
-- Files go in a folder named after the user's id: <user_id>/pan.pdf
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kyc-documents', 'kyc-documents', false, 2097152,
  array['application/pdf','image/jpeg','image/png']
)
on conflict (id) do update
  set public = false,
      file_size_limit = 2097152,
      allowed_mime_types = array['application/pdf','image/jpeg','image/png'];

drop policy if exists "kyc files: upload own folder" on storage.objects;
drop policy if exists "kyc files: read own or staff" on storage.objects;

create policy "kyc files: upload own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'kyc-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- No update or delete policy for customers: a document cannot be swapped
-- after it has been uploaded.
create policy "kyc files: read own or staff"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'kyc-documents'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.can_review_kyc()
    )
  );
