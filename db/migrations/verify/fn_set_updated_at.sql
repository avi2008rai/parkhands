-- Verify PH:fn_set_updated_at on pg

BEGIN;

  SELECT pg_catalog.has_function_privilege('util.set_updated_at()', 'EXECUTE');

ROLLBACK;
