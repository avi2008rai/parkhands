-- Deploy PH:trg_pg_event_pg_notify_insert to pg
-- requires: table_pg_event
-- requires: fn_pg_event_pg_notify_insert

BEGIN;

CREATE TRIGGER trg_pg_event_pg_notify_insert
  AFTER INSERT
  ON private.pg_event
  FOR EACH ROW EXECUTE PROCEDURE util.pg_event_pg_notify_insert();

COMMIT;
