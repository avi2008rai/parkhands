-- Verify PH:type_space_verification_status on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.space_verification_status', 'usage'));

END $$;
