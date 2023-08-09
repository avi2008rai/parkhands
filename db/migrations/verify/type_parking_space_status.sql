-- Verify PH:type_parking_space_status on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.parking_space_status', 'usage'));

END $$;
