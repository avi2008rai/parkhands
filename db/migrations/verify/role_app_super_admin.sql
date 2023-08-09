-- Verify PH:role_app_super_admin on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_catalog.pg_roles
 WHERE rolname = 'app_super_admin';

ROLLBACK;
