-- Takshaya: stored documents, reviewer checklist, and reviewer detection.
-- Run in the Supabase SQL Editor AFTER 001. Safe to re-run.
-- Run this BEFORE the website update goes live: the new submit form saves
-- a "documents" list, which needs the column below.

alter table public.verification_applications
  add column if not exists documents        jsonb not null default '[]'::jsonb,
  add column if not exists review_checklist jsonb not null default '{}'::jsonb,
  add column if not exists review_notes     text;

-- A rejection must always carry a reason the company can read.
-- NOT VALID so existing rows are not re-checked.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'rejected_needs_reason'
  ) then
    alter table public.verification_applications
      add constraint rejected_needs_reason
      check (status <> 'REJECTED' or coalesce(trim(rejection_reason), '') <> '')
      not valid;
  end if;
end $$;

-- Lets the website ask "am I a Takshaya reviewer?". A user can see only
-- their own row, so nobody can list the staff.
revoke all on public.staff_users from anon;
grant select on public.staff_users to authenticated;

drop policy if exists "staff: read own role" on public.staff_users;
create policy "staff: read own role"
  on public.staff_users for select to authenticated
  using (user_id = auth.uid());

-- A company must not be able to submit with the reviewer's fields already
-- filled in (for example a pre-ticked checklist or notes). Same rules as
-- before, plus these two. Customers still have no update or delete policy.
drop policy if exists "own application: submit" on public.verification_applications;
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
    and review_checklist = '{}'::jsonb
    and review_notes is null
  );
