-- Verify PH:trg_pg_event_pg_notify_insert on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_trigger
  WHERE tgname = 'trg_pg_event_pg_notify_insert';

ROLLBACK;
