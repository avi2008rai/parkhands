-- Deploy PH:table_slot_availability to pg
-- requires: table_slot

BEGIN;

  ALTER TABLE api.slot_availability
  DROP CONSTRAINT fk_tariff_currency,
  DROP COLUMN tariff_currency;

COMMIT;
