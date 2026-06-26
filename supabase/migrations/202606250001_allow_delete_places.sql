drop policy if exists "Allow anonymous deletes for local MVP" on public.places;
create policy "Allow anonymous deletes for local MVP"
  on public.places
  for delete
  to anon
  using (true);
