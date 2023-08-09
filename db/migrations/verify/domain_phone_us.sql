-- Verify PH:domain_phone_us on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.phone_us', 'usage'));

END $$;
