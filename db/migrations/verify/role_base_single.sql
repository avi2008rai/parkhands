-- Verify PH:role_base_single on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_catalog.pg_roles
 WHERE rolname = 'base_single';

ROLLBACK;
