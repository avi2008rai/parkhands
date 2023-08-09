-- Verify PH:table_private_pg_event on pg

BEGIN;

SELECT
  id
  , event_key
  , payload
  , created_at
  FROM private.pg_event
    WHERE FALSE;

ROLLBACK;
