-- Revert PH:table_business from pg

BEGIN;

  DROP TABLE api.business;

COMMIT;
