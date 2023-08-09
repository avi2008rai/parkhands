-- Revert PH:grants_parking_working_hours from pg

BEGIN;

  REVOKE SELECT ON api.parking_working_hours FROM app_anonymous;

  REVOKE SELECT ON api.parking_working_hours FROM base_single;
  REVOKE INSERT ON api.parking_working_hours FROM base_single;
  REVOKE UPDATE ON api.parking_working_hours FROM base_single;
  REVOKE DELETE ON api.parking_working_hours FROM base_single;

  REVOKE SELECT ON api.parking_working_hours FROM base_super;
  REVOKE INSERT ON api.parking_working_hours FROM base_super;
  REVOKE UPDATE ON api.parking_working_hours FROM base_super;
  REVOKE DELETE ON api.parking_working_hours FROM base_super;

COMMIT;
