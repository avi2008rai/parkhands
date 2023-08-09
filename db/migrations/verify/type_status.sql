-- Verify PH:type_status on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.status_t', 'usage'));

END $$;
