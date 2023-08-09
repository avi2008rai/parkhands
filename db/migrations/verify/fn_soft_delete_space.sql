-- Verify PH:fn_soft_delete_space on pg

BEGIN;

  SELECT pg_catalog.has_function_privilege('util.soft_delete_space()', 'EXECUTE');

ROLLBACK;
