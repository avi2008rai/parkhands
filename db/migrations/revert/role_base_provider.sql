-- Revert PH:role_base_provider from pg

BEGIN;

  DROP ROLE base_provider;

COMMIT;
