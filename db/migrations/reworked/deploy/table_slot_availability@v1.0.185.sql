-- Deploy PH:table_slot_availability to pg
-- requires: table_slot

BEGIN;

  ALTER TABLE api.slot_availability
  ADD COLUMN tariff_per_hour NUMERIC(5, 2),
  ADD COLUMN cancel_charge NUMERIC(5, 2);

COMMIT;
