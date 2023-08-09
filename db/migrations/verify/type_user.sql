-- Verify PH:type_user on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.user_t', 'usage'));

END $$;
