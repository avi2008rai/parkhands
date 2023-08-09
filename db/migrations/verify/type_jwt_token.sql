-- Verify PH:type_jwt_token on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.jwt_token', 'usage'));

END $$;
