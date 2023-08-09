-- Revert PH:fn_pg_event_pg_notify_insert from pg

BEGIN;

DROP FUNCTION util.pg_event_pg_notify_insert();

COMMIT;
