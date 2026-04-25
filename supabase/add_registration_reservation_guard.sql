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
