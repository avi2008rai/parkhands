-- Verify PH:type_slot_category on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.slot_category', 'usage'));

END $$;
