-- Verify PH:type_business_status on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.slot_business_status', 'usage'));

END $$;
