-- Verify PH:schema_timescale on pg

DO $$
BEGIN

ASSERT (SELECT has_schema_privilege('timescale', 'usage'));

END $$;
