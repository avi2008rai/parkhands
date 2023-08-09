-- Revert PH:table_user from pg

BEGIN;

DROP TABLE api.user;

COMMIT;
