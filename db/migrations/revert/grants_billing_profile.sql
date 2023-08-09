-- Revert PH:grants_billing_profile from pg

BEGIN;

  REVOKE SELECT ON api.billing_profile FROM base_single;
  REVOKE INSERT ON api.billing_profile FROM base_single;
  REVOKE UPDATE ON api.billing_profile FROM base_single;
  REVOKE DELETE ON api.billing_profile FROM base_single;

  REVOKE SELECT ON api.billing_profile FROM base_super;
  REVOKE INSERT ON api.billing_profile FROM base_super;
  REVOKE UPDATE ON api.billing_profile FROM base_super;
  REVOKE DELETE ON api.billing_profile FROM base_super;

COMMIT;
