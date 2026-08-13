-- ============================================================================
-- MY ACADEMIC TUTOR
-- Certificate issuance + public verification
-- Run this in Supabase SQL Editor.
-- ============================================================================

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  course_slug text not null,

  certificate_code text not null
    unique,

  learner_name text not null,

  course_title text not null,

  completed_at timestamptz not null,

  final_assessment_percentage numeric(5,2),

  issued_at timestamptz not null
    default now(),

  revoked_at timestamptz,

  created_at timestamptz not null
    default now(),

  unique (
    user_id,
    course_slug
  ),

  check (
    final_assessment_percentage is null
    or (
      final_assessment_percentage >= 0
      and final_assessment_percentage <= 100
    )
  )
);


alter table public.certificates
enable row level security;


drop policy if exists
"Users can view own certificates"
on public.certificates;


create policy
"Users can view own certificates"
on public.certificates
for select
using (
  auth.uid() = user_id
);


drop policy if exists
"Users can insert own certificates"
on public.certificates;


create policy
"Users can insert own certificates"
on public.certificates
for insert
with check (
  auth.uid() = user_id
);


-- Public certificate verification is exposed only through this restricted
-- function. It returns certificate fields but never user_id or account data.
create or replace function public.verify_certificate(
  p_certificate_code text
)
returns table (
  certificate_code text,
  learner_name text,
  course_title text,
  completed_at timestamptz,
  final_assessment_percentage numeric,
  issued_at timestamptz,
  status text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    c.certificate_code,
    c.learner_name,
    c.course_title,
    c.completed_at,
    c.final_assessment_percentage,
    c.issued_at,
    case
      when c.revoked_at is null
        then 'valid'::text
      else 'revoked'::text
    end as status
  from public.certificates c
  where upper(c.certificate_code) =
        upper(trim(p_certificate_code))
  limit 1;
$$;


revoke all
on function public.verify_certificate(text)
from public;


grant execute
on function public.verify_certificate(text)
to anon, authenticated;
