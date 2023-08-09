-- Verify PH:type_booking_status_t on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.booking_status_t', 'usage'));

END $$;
