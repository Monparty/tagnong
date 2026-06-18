-- Pet QR — schema for the `pets` table.
-- Paste this into the Supabase SQL Editor and run it.
-- (Dashboard → SQL Editor → New query → paste → Run)
--
-- NOTE: this DROPS the existing pets table first so re-running always
-- yields the exact schema below. Safe for the demo (no real data yet).

drop table if exists public.pets cascade;

create table public.pets (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  species     text not null,
  breed       text,
  color       text,
  health      text,
  contact_type text,
  contact     text not null,
  password    text not null,
  lost_mode   boolean not null default false
);

-- Enable Row Level Security.
alter table public.pets enable row level security;

-- DEMO ONLY: allow the anon role full access so the prototype can read/write
-- without auth. Do NOT keep this policy in production.
drop policy if exists "demo anon full access" on public.pets;
create policy "demo anon full access"
  on public.pets
  for all
  to anon
  using (true)
  with check (true);

-- Force PostgREST to reload its schema cache so the new columns are
-- visible to the REST/Data API immediately (fixes "Could not find the
-- 'color' column ... in the schema cache").
notify pgrst, 'reload schema';

-- Sanity check: confirm the columns that now exist.
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'pets'
order by ordinal_position;
