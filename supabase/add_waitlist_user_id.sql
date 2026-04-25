alter table public.waitlist_entries
add column if not exists user_id uuid references auth.users (id) on delete set null;

create index if not exists waitlist_entries_user_id_idx on public.waitlist_entries (user_id);
