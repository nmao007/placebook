create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  notes text,
  status text not null default 'Saved' check (status in ('Saved', 'Visited')),
  category text not null default 'Other' check (category in ('City', 'Region', 'Landmark', 'Beach', 'National Park', 'Other')),
  favorite boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.places enable row level security;

drop policy if exists "Allow anonymous reads for local MVP" on public.places;
create policy "Allow anonymous reads for local MVP"
  on public.places
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous inserts for local MVP" on public.places;
create policy "Allow anonymous inserts for local MVP"
  on public.places
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous deletes for local MVP" on public.places;
create policy "Allow anonymous deletes for local MVP"
  on public.places
  for delete
  to anon
  using (true);

drop policy if exists "Allow anonymous updates for local MVP" on public.places;
create policy "Allow anonymous updates for local MVP"
  on public.places
  for update
  to anon
  using (true)
  with check (true);
