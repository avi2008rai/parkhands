-- Deploy PH:table_slot_availability to pg
-- requires: table_slot

BEGIN;

  ALTER TABLE api.slot_availability
  DROP COLUMN tariff_per_hour,
  DROP COLUMN cancel_charge;

COMMIT;
