-- Revert PH:trg_pg_event_pg_notify_insert from pg

BEGIN;

DROP TRIGGER trg_pg_event_pg_notify_insert ON private.pg_event;

COMMIT;
