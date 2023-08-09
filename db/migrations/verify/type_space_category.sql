-- Verify PH:type_space_category on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.space_category', 'usage'));

END $$;
