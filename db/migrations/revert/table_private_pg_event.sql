-- Revert PH:table_private_pg_event from pg

BEGIN;

DROP TABLE private.pg_event;

COMMIT;
