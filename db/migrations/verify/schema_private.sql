-- Verify PH:schema_private on pg

DO $$
BEGIN

ASSERT (SELECT has_schema_privilege('private', 'usage'));

END $$;
