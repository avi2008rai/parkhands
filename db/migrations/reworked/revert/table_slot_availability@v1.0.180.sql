-- Deploy PH:table_slot_availability to pg
-- requires: table_slot

BEGIN;

  ALTER TABLE api.slot_availability
  DROP CONSTRAINT start_hour_not_less_than_end_hour;

COMMIT;
