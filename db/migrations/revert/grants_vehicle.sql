-- Revert PH:grants_vehicle from pg

BEGIN;

  REVOKE SELECT ON api.vehicle FROM base_single;
  REVOKE INSERT ON api.vehicle FROM base_single;
  REVOKE UPDATE ON api.vehicle FROM base_single;
  REVOKE DELETE ON api.vehicle FROM base_single;

  REVOKE SELECT ON api.vehicle FROM base_super;
  REVOKE INSERT ON api.vehicle FROM base_super;
  REVOKE UPDATE ON api.vehicle FROM base_super;
  REVOKE DELETE ON api.vehicle FROM base_super;

COMMIT;
