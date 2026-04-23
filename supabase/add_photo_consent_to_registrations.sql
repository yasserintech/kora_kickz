alter table public.registrations
add column if not exists photo_consent_accepted boolean not null default false;
