-- Verify PH:role_app_provider_premium on pg

BEGIN;

  SELECT 1/COUNT(*)
    FROM pg_catalog.pg_roles
    WHERE rolname = 'app_provider_premium';

ROLLBACK;
