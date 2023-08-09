-- Verify PH:domain_email on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.email', 'usage'));

END $$;
