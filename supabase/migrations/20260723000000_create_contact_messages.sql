-- Contact enquiries submitted from the Bandesha Empire homepage form.
-- Security model: anonymous visitors may INSERT only. There is intentionally
-- no SELECT / UPDATE / DELETE policy, so with RLS enabled the anon and
-- authenticated roles cannot read or modify rows — submissions are readable
-- only via the service role in the Supabase dashboard/back office.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name       text        not null check (char_length(full_name) between 1 and 120),
  email           text        not null check (char_length(email) between 3 and 200),
  company         text        check (company is null or char_length(company) <= 160),
  service         text        not null check (char_length(service) between 1 and 60),
  project_summary text        not null check (char_length(project_summary) between 1 and 4000),
  budget_range    text        check (budget_range is null or char_length(budget_range) <= 60),
  timeline        text        check (timeline is null or char_length(timeline) <= 60),
  created_at      timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Allow anonymous (and signed-in) visitors to submit a message.
create policy "contact_messages_anon_insert"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- No read/update/delete policies are defined on purpose: RLS denies them by default.
