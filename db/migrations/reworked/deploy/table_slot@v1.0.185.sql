-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

  UPDATE api.slot SET price_per_hour = 1
  WHERE price_per_hour < 1 AND price_per_hour != 0;

  ALTER TABLE api.slot
  ADD CONSTRAINT slot_pricing_more_than_1
  CHECK (
    price_per_hour >= 1 OR price_per_hour = 0
  );

COMMIT;
