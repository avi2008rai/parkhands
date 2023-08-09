-- Deploy PH:table_slot_availability to pg
-- requires: table_slot

BEGIN;

  ALTER TABLE api.slot_availability
  ADD COLUMN tariff_currency UUID,
  ADD CONSTRAINT fk_tariff_currency
      FOREIGN KEY (tariff_currency)
      REFERENCES api.currency(ID);

COMMIT;
