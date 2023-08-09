-- Verify PH:schema_util on pg

DO $$
BEGIN

ASSERT (SELECT has_schema_privilege('util', 'usage'));

END $$;
