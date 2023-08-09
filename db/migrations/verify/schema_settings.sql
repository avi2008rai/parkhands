-- Verify PH:schema_settings on pg

DO $$
BEGIN

ASSERT (SELECT has_schema_privilege('settings', 'usage'));

END $$;
