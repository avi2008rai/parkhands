-- Verify PH:role_app_anonymous on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_catalog.pg_roles
 WHERE rolname = 'app_anonymous';

ROLLBACK;
