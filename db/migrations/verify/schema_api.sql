-- Verify PH:schema_api on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('api', 'usage');

ROLLBACK;
