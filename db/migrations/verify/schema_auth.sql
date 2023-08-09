-- Verify PH:schema_auth on pg

DO $$
BEGIN

ASSERT (SELECT has_schema_privilege('auth', 'usage'));

END $$;
