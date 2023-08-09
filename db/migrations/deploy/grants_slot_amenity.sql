-- Deploy PH:grants_slot_amenity to pg
-- requires: table_slot
-- requires: table_amenity

BEGIN;

  GRANT SELECT ON api.slot_amenity TO app_anonymous;
  
  GRANT SELECT ON api.slot_amenity TO base_single;
  GRANT INSERT ON api.slot_amenity TO base_single;
  GRANT DELETE ON api.slot_amenity TO base_single;

  GRANT SELECT ON api.slot_amenity TO base_super;
  GRANT INSERT ON api.slot_amenity TO base_super;
  GRANT DELETE ON api.slot_amenity TO base_super;

COMMIT;
