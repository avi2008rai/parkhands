-- Verify PH:type_slot_verification_status on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.slot_verification_status', 'usage'));

END $$;
