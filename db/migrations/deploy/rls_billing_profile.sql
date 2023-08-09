-- Deploy PH:rls_billing_profile to pg
-- requires: table_billing_profile

BEGIN;

  ALTER TABLE api.billing_profile ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.billing_profile
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.billing_profile
  USING (
    user_id = request.user_id()
  );

COMMIT;
