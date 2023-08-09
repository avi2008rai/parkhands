-- Verify PH:schema_request on pg

DO $$
BEGIN

ASSERT (SELECT has_schema_privilege('request', 'usage'));
ASSERT (SELECT has_schema_privilege('public', 'request', 'usage'));

END $$;
