-- Verify PH:table_slot_amenity on pg

BEGIN;

  SELECT
      id
      , slot_id
      , amenity_id
  FROM api.slot_amenity
    WHERE FALSE;

ROLLBACK;
