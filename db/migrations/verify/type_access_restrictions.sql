-- Verify PH:type_access_restrictions on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.access_restrictions', 'usage'));

END $$;
