-- Revert PH:data_country to pg

BEGIN;

DELETE FROM api.country;

COMMIT;
