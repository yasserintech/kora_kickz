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
create unique index if not exists registrations_active_child_program_idx
on public.registrations (program_id, user_id, lower(child_name))
where status in ('pending_payment', 'paid');

create or replace function public.reserve_registration(
  p_program_id uuid,
  p_user_id uuid,
  p_parent_first_name text,
  p_parent_last_name text,
  p_parent_email text,
  p_phone_number text,
  p_child_name text,
  p_child_age integer,
  p_liability_accepted boolean,
  p_photo_consent_accepted boolean,
  p_program_fee integer,
  p_organization_fee integer,
  p_total_fee integer,
  p_reservation_expires_at timestamptz
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_capacity integer;
  v_active_count integer;
  v_registration_id uuid;
begin
  select capacity
  into v_capacity
  from public.programs
  where id = p_program_id
  for update;

  if not found then
    raise exception 'Program not found.';
  end if;

  select count(*)
  into v_active_count
  from public.registrations
  where program_id = p_program_id
    and (
      status = 'paid'
      or (
        status = 'pending_payment'
        and reservation_expires_at is not null
        and reservation_expires_at > timezone('utc', now())
      )
    );

  if v_active_count >= v_capacity then
    raise exception 'This class is full. Please join the waiting list instead.';
  end if;

  insert into public.registrations (
    program_id,
    user_id,
    parent_first_name,
    parent_last_name,
    parent_email,
    phone_number,
    child_name,
    child_age,
    liability_accepted,
    photo_consent_accepted,
    status,
    reservation_expires_at,
    program_fee,
    organization_fee,
    total_fee
  ) values (
    p_program_id,
    p_user_id,
    p_parent_first_name,
    p_parent_last_name,
    p_parent_email,
    p_phone_number,
    p_child_name,
    p_child_age,
    p_liability_accepted,
    p_photo_consent_accepted,
    'pending_payment',
    p_reservation_expires_at,
    p_program_fee,
    p_organization_fee,
    p_total_fee
  )
  returning id into v_registration_id;

  return v_registration_id;
exception
  when unique_violation then
    raise exception 'A checkout session is already active for this child. Please complete that payment first.';
end;
$$;

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  program_slug text not null,
  user_id uuid references auth.users (id) on delete set null,
  parent_name text not null,
  email text not null,
  requested_time_labels text[] not null default '{}'::text[],
  created_at timestamptz not null default timezone('utc', now()),
  unique (program_slug, email)
);

create index if not exists waitlist_entries_user_id_idx on public.waitlist_entries (user_id);

alter table public.programs enable row level security;
alter table public.parent_profiles enable row level security;
alter table public.registrations enable row level security;
alter table public.waitlist_entries enable row level security;

drop policy if exists "Programs are viewable by everyone" on public.programs;
create policy "Programs are viewable by everyone"
on public.programs
for select
using (true);

drop policy if exists "Parents can view their own profile" on public.parent_profiles;
create policy "Parents can view their own profile"
on public.parent_profiles
for select
using (auth.uid() = id);

drop policy if exists "Parents can insert their own profile" on public.parent_profiles;
create policy "Parents can insert their own profile"
on public.parent_profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Parents can update their own profile" on public.parent_profiles;
create policy "Parents can update their own profile"
on public.parent_profiles
for update
using (auth.uid() = id);
