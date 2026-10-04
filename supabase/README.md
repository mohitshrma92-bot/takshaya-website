# Supabase setup

## 1. Run the migration

Open your Supabase project, go to **SQL Editor**, paste `migrations/001_verification_applications.sql` and run it. It is safe to run more than once.

It sets up:
- the `verification_applications` table (a company sees only its own row, and cannot approve itself)
- a `staff_users` table for the Takshaya team
- a private `kyc-documents` storage bucket, with each company limited to its own folder

If the unique-index step fails, you have duplicate applications for one user. Remove the extras and run it again.

## 2. Make yourself a reviewer

Replace the email with your own sign-up email:

```sql
insert into public.staff_users (user_id, role)
select id, 'platform_admin' from auth.users where email = 'you@example.com';
```

## 3. Approve a company (until the admin screen exists)

Approved companies can open the marketplace and RFQs. In the SQL Editor:

```sql
update public.verification_applications
set status = 'APPROVED', reviewed_at = now()
where id = '<application id>';
```

Other statuses: `PENDING_REVIEW`, `UNDER_REVIEW`, `REJECTED` (set `rejection_reason` too), `SUSPENDED`.

## 4. Check before launch

- In **Authentication > Providers > Email**, keep "Confirm email" on.
- Confirm both tables above show "RLS enabled" in the Table Editor.
- Never put the `service_role` key in the website code. The site uses only the publishable key.
