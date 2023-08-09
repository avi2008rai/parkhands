-- Revert PH:role_app_provider from pg

BEGIN;

  DROP ROLE app_provider;

COMMIT;
