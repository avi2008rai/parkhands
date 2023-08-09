-- Verify PH:type_slot_status_t on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.slot_status_t', 'usage'));

END $$;
