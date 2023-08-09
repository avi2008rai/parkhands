-- Revert PH:grants_parking_space from pg

BEGIN;

  REVOKE SELECT ON api.parking_space FROM app_anonymous;
  REVOKE SELECT ON api.parking_space FROM base_single;
  REVOKE SELECT ON api.parking_space FROM app_provider;

  REVOKE SELECT ON api.parking_space FROM app_provider_premium;
  REVOKE INSERT ON api.parking_space FROM app_provider_premium;
  REVOKE UPDATE ON api.parking_space FROM app_provider_premium;
  REVOKE DELETE ON api.parking_space FROM app_provider_premium;

  REVOKE SELECT ON api.parking_space FROM base_super;
  REVOKE INSERT ON api.parking_space FROM base_super;
  REVOKE UPDATE ON api.parking_space FROM base_super;
  REVOKE DELETE ON api.parking_space FROM base_super;

COMMIT;
