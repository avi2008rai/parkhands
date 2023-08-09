-- Revert PH:grants_slot_booking from pg

BEGIN;

  REVOKE SELECT ON timescale.slot_booking FROM base_single;
  REVOKE INSERT ON timescale.slot_booking FROM base_single;
  REVOKE UPDATE ON timescale.slot_booking FROM base_single;
  REVOKE DELETE ON timescale.slot_booking FROM base_single;

  REVOKE SELECT ON timescale.slot_booking FROM base_super;
  REVOKE INSERT ON timescale.slot_booking FROM base_super;
  REVOKE UPDATE ON timescale.slot_booking FROM base_super;
  REVOKE DELETE ON timescale.slot_booking FROM base_super;

COMMIT;
