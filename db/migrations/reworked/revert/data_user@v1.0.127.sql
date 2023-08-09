-- Revert PH:data_user to pg

BEGIN;

TRUNCATE api.user CASCADE;

COMMIT;
