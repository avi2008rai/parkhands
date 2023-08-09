-- Revert PH:grant_vehicle_type from pg

BEGIN;

REVOKE SELECT ON api.vehicle_type FROM base_single;

REVOKE SELECT ON api.vehicle_type FROM base_super;
REVOKE INSERT ON api.vehicle_type FROM base_super;
REVOKE UPDATE ON api.vehicle_type FROM base_super;
REVOKE DELETE ON api.vehicle_type FROM base_super;

COMMIT;
