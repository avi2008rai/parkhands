-- Deploy PH:rls_business to pg
-- requires: table_business

BEGIN;

  ALTER TABLE api.business ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.business
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.business
  USING (
    owner_id = request.user_id()
  );

  CREATE POLICY select_enabled_rows ON api.business FOR SELECT
  USING (TRUE);

COMMIT;
