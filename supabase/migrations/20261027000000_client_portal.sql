-- Client workspace. Apply through the Supabase SQL editor or your migration pipeline.
-- No public clients can change delivery status, prices, invoices or studio replies.
begin;

create table public.portal_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 120),
  company text not null default '' check (char_length(company) <= 160),
  updated_at timestamptz not null default now()
);

create table public.portal_orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  client_id uuid not null references auth.users(id) on delete cascade,
  client_request_id uuid not null,
  title text not null check (char_length(title) between 3 and 120),
  service text not null check (service in ('Website & Experience','Web Applications','AI Agents & Automation','Shopify & Commerce','Mobile Applications','Connected Systems')),
  package text not null check (package in ('starter','growth','custom')),
  brief text not null check (char_length(brief) between 30 and 6000),
  budget text not null default '' check (char_length(budget) <= 120),
  timeline text not null default '' check (char_length(timeline) <= 120),
  website_url text not null default '' check (char_length(website_url) <= 500),
  status text not null default 'submitted' check (status in ('submitted','scoping','in_progress','in_review','completed','cancelled')),
  progress integer not null default 0 check (progress between 0 and 100),
  quoted_amount_cents integer check (quoted_amount_cents >= 0),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, client_request_id),
  unique (id, client_id)
);

create table public.portal_order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.portal_orders(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  description text not null default '' check (char_length(description) <= 2000),
  created_at timestamptz not null default now()
);

create table public.portal_messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid,
  sender_role text not null default 'client' check (sender_role in ('client','studio')),
  body text not null check (char_length(btrim(body)) between 1 and 4000),
  read_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (order_id, client_id) references public.portal_orders(id, client_id) on delete cascade
);

create table public.portal_invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid,
  invoice_number text not null unique,
  description text not null,
  amount_cents integer not null check (amount_cents > 0),
  status text not null default 'issued' check (status in ('issued','paid','void')),
  due_date date,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (order_id, client_id) references public.portal_orders(id, client_id) on delete cascade
);

create table public.portal_files (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid,
  name text not null check (char_length(name) between 1 and 180),
  storage_path text not null unique,
  size_bytes bigint not null check (size_bytes between 1 and 10485760),
  mime_type text not null,
  created_at timestamptz not null default now(),
  foreign key (order_id, client_id) references public.portal_orders(id, client_id) on delete cascade
);

create index portal_orders_client_created on public.portal_orders (client_id, created_at desc);
create index portal_events_order_created on public.portal_order_events (order_id, created_at desc);
create index portal_messages_client_created on public.portal_messages (client_id, created_at);
create index portal_invoices_client_created on public.portal_invoices (client_id, created_at desc);
create index portal_files_client_created on public.portal_files (client_id, created_at desc);

alter table public.portal_profiles enable row level security;
alter table public.portal_orders enable row level security;
alter table public.portal_order_events enable row level security;
alter table public.portal_messages enable row level security;
alter table public.portal_invoices enable row level security;
alter table public.portal_files enable row level security;

revoke all on public.portal_profiles, public.portal_orders, public.portal_order_events,
  public.portal_messages, public.portal_invoices, public.portal_files from anon, authenticated;
grant select on public.portal_profiles, public.portal_orders, public.portal_order_events,
  public.portal_messages, public.portal_invoices, public.portal_files to authenticated;
grant insert (user_id, full_name, company), update (full_name, company) on public.portal_profiles to authenticated;
grant insert (client_id, client_request_id, title, service, package, brief, budget, timeline, website_url) on public.portal_orders to authenticated;
grant usage on sequence public.portal_orders_order_number_seq to authenticated;
grant insert (client_id, order_id, body), update (read_at) on public.portal_messages to authenticated;
grant insert (client_id, order_id, name, storage_path, size_bytes, mime_type) on public.portal_files to authenticated;
grant all on public.portal_profiles, public.portal_orders, public.portal_order_events,
  public.portal_messages, public.portal_invoices, public.portal_files to service_role;
grant all on sequence public.portal_orders_order_number_seq to service_role;

create policy profiles_read_own on public.portal_profiles for select to authenticated using (user_id = (select auth.uid()));
create policy profiles_insert_own on public.portal_profiles for insert to authenticated with check (user_id = (select auth.uid()));
create policy profiles_update_own on public.portal_profiles for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy orders_read_own on public.portal_orders for select to authenticated using (client_id = (select auth.uid()));
create policy orders_submit_own on public.portal_orders for insert to authenticated with check (
  client_id = (select auth.uid()) and status = 'submitted' and progress = 0
  and quoted_amount_cents is null and due_date is null
);
create policy events_read_own on public.portal_order_events for select to authenticated using (
  exists (select 1 from public.portal_orders o where o.id = order_id and o.client_id = (select auth.uid()))
);

create policy messages_read_own on public.portal_messages for select to authenticated using (client_id = (select auth.uid()));
create policy messages_send_own on public.portal_messages for insert to authenticated with check (
  client_id = (select auth.uid()) and sender_role = 'client' and read_at is null
);
create policy messages_mark_studio_read on public.portal_messages for update to authenticated
  using (client_id = (select auth.uid()) and sender_role = 'studio')
  with check (client_id = (select auth.uid()) and sender_role = 'studio');
create policy invoices_read_own on public.portal_invoices for select to authenticated using (client_id = (select auth.uid()));
create policy files_read_own on public.portal_files for select to authenticated using (client_id = (select auth.uid()));
create policy files_register_own on public.portal_files for insert to authenticated with check (
  client_id = (select auth.uid()) and split_part(storage_path, '/', 1) = (select auth.uid())::text
  and exists (select 1 from storage.objects o where o.bucket_id = 'portal-files' and o.name = storage_path)
);

create function public.portal_order_submitted() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.portal_order_events(order_id, title, description)
  values (new.id, 'Project brief received', 'Your brief is with the studio. We will confirm the scope, price and next steps before work begins.');
  return new;
end;
$$;
revoke all on function public.portal_order_submitted() from public, anon, authenticated;
create trigger portal_on_order_submitted after insert on public.portal_orders for each row execute function public.portal_order_submitted();

create function public.portal_timestamp_update() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
revoke all on function public.portal_timestamp_update() from public, anon, authenticated;
create trigger portal_orders_updated before update on public.portal_orders for each row execute function public.portal_timestamp_update();
create trigger portal_profiles_updated before update on public.portal_profiles for each row execute function public.portal_timestamp_update();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portal-files', 'portal-files', false, 10485760, array[
  'application/pdf','image/png','image/jpeg','image/webp','text/plain','application/zip','application/x-zip-compressed',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]) on conflict (id) do nothing;

create policy portal_storage_read_own on storage.objects for select to authenticated
  using (bucket_id = 'portal-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy portal_storage_upload_own on storage.objects for insert to authenticated
  with check (bucket_id = 'portal-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
-- Deletion only permits cleaning up an upload whose metadata was not registered.
create policy portal_storage_remove_unregistered on storage.objects for delete to authenticated
  using (bucket_id = 'portal-files' and (storage.foldername(name))[1] = (select auth.uid())::text
    and not exists (select 1 from public.portal_files f where f.storage_path = storage.objects.name));

commit;
