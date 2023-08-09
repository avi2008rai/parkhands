-- Revert PH:table_currency from pg

BEGIN;

DROP TABLE api.currency;

COMMIT;
