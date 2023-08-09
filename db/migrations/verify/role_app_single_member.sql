-- Verify PH:role_app_single_member on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_catalog.pg_roles
 WHERE rolname = 'app_single_member';

ROLLBACK;
