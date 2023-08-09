-- Deploy PH:rls_user_subscription to pg
-- requires: table_user_subscription

BEGIN;

  ALTER TABLE api.user_subscription ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.user_subscription
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.user_subscription
  USING (
    user_id = request.user_id()
  );

COMMIT;
