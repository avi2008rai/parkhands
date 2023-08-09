-- Revert PH:table_private_user from pg

BEGIN;

DROP TABLE private.user;

COMMIT;
