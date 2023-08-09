-- Verify PH:fn_soft_delete_user on pg

BEGIN;

  SELECT pg_catalog.has_function_privilege('util.soft_delete_user()', 'EXECUTE');

ROLLBACK;
