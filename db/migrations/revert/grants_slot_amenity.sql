-- Revert PH:grants_slot_amenity from pg

BEGIN;

  REVOKE SELECT ON api.slot_amenity FROM app_anonymous;

  REVOKE SELECT ON api.slot_amenity FROM base_single;
  REVOKE INSERT ON api.slot_amenity FROM base_single;
  REVOKE DELETE ON api.slot_amenity FROM base_single;

  REVOKE SELECT ON api.slot_amenity FROM base_super;
  REVOKE INSERT ON api.slot_amenity FROM base_super;
  REVOKE DELETE ON api.slot_amenity FROM base_super;

COMMIT;
