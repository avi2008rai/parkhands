-- Revert PH:table_country from pg

BEGIN;

DROP TABLE api.country;

COMMIT;
