-- Revert PH:role_app_provider_premium from pg

BEGIN;

  DROP ROLE app_provider_premium;

COMMIT;
