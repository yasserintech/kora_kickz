create extension if not exists "pgcrypto";

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  sport text not null,
  capacity integer not null default 16,
  program_fee integer not null,
  organization_fee integer not null,
  total_fee integer not null,
  date_range_label text not null,
  sessions_label text not null,
  no_class_label text not null,
  time_label text not null,
  location_name text not null,
  location_address text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.parent_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  parent_first_name text not null,
  parent_last_name text not null,
  parent_email text not null,
  phone_number text not null,
  child_name text not null,
  child_age integer not null,
  liability_accepted boolean not null default false,
  photo_consent_accepted boolean not null default false,
  status text not null default 'pending_payment',
  reservation_expires_at timestamptz,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  program_fee integer not null,
  organization_fee integer not null,
  total_fee integer not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists registrations_program_id_idx on public.registrations (program_id);
create index if not exists registrations_user_id_idx on public.registrations (user_id);
create index if not exists registrations_status_idx on public.registrations (status);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  program_slug text not null,
  parent_name text not null,
  email text not null,
  requested_time_labels text[] not null default '{}'::text[],
  created_at timestamptz not null default timezone('utc', now()),
  unique (program_slug, email)
);

alter table public.programs enable row level security;
alter table public.parent_profiles enable row level security;
alter table public.registrations enable row level security;
alter table public.waitlist_entries enable row level security;

create policy "Programs are viewable by everyone"
on public.programs
for select
using (true);

create policy "Parents can view their own profile"
on public.parent_profiles
for select
using (auth.uid() = id);

create policy "Parents can insert their own profile"
on public.parent_profiles
for insert
with check (auth.uid() = id);

create policy "Parents can update their own profile"
on public.parent_profiles
for update
using (auth.uid() = id);
