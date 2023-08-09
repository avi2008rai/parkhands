-- Verify PH:type_space_access_restriction on pg

DO $$
BEGIN

  ASSERT (SELECT has_type_privilege('public.space_access_restriction', 'usage'));

END $$;
