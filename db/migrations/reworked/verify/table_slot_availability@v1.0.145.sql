-- Verify PH:table_slot_availability on pg

BEGIN;

  SELECT
    id
    , slot_id
    , day_of_week
    , start_hour
    , end_hour
    , created_at
  FROM api.slot_availability
    WHERE FALSE;

ROLLBACK;
