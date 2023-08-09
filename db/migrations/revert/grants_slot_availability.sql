-- Revert PH:grants_slot_availability from pg

BEGIN;

  REVOKE SELECT ON api.slot_availability FROM app_anonymous;
  
  REVOKE SELECT ON api.slot_availability FROM base_single;
  REVOKE INSERT ON api.slot_availability FROM base_single;
  REVOKE UPDATE ON api.slot_availability FROM base_single;
  REVOKE DELETE ON api.slot_availability FROM base_single;

  REVOKE SELECT ON api.slot_availability FROM base_super;
  REVOKE INSERT ON api.slot_availability FROM base_super;
  REVOKE UPDATE ON api.slot_availability FROM base_super;
  REVOKE DELETE ON api.slot_availability FROM base_super;

COMMIT;
