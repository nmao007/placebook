alter table public.places
  add column if not exists country text,
  add column if not exists category text not null default 'Other',
  add column if not exists favorite boolean not null default false;

alter table public.places
  drop constraint if exists places_category_check;

alter table public.places
  add constraint places_category_check
  check (category in ('City', 'Region', 'Landmark', 'Beach', 'National Park', 'Other'));

drop policy if exists "Allow anonymous updates for local MVP" on public.places;
create policy "Allow anonymous updates for local MVP"
  on public.places
  for update
  to anon
  using (true)
  with check (true);
