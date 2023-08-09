-- Revert PH:grants_vehicle_size from pg

BEGIN;

  REVOKE SELECT ON api.vehicle_size FROM app_anonymous;
  REVOKE SELECT ON api.vehicle_size FROM base_single;

  REVOKE SELECT ON api.vehicle_size FROM base_super;
  REVOKE INSERT ON api.vehicle_size FROM base_super;
  REVOKE UPDATE ON api.vehicle_size FROM base_super;
  REVOKE DELETE ON api.vehicle_size FROM base_super;

COMMIT;
