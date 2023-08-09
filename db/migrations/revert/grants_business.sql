-- Revert PH:grants_business from pg

BEGIN;

  REVOKE SELECT ON api.business FROM app_anonymous;
  REVOKE SELECT ON api.business FROM base_single;
  REVOKE SELECT ON api.business FROM app_provider;

  REVOKE SELECT ON api.business FROM app_provider_premium;
  REVOKE INSERT ON api.business FROM app_provider_premium;
  REVOKE UPDATE ON api.business FROM app_provider_premium;
  REVOKE DELETE ON api.business FROM app_provider_premium;

  REVOKE SELECT ON api.business FROM base_super;
  REVOKE INSERT ON api.business FROM base_super;
  REVOKE UPDATE ON api.business FROM base_super;
  REVOKE DELETE ON api.business FROM base_super;

COMMIT;
