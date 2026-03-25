alter table public.waitlist_entries
add column if not exists requested_time_labels text[] not null default '{}'::text[];
