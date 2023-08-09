-- Deploy PH:rls_user to pg
-- requires: table_user
-- requires: grant_user
-- requires: fn_user_id
-- requires: fn_user_role
-- requires: fn_org_id

BEGIN;

ALTER TABLE api.user ENABLE ROW LEVEL SECURITY;

CREATE POLICY crud_any_rows ON api.user
USING (
  pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  AND NOT deleted
);

CREATE POLICY crud_own_rows ON api.user
USING (
  id = request.user_id()
  AND NOT deleted
  AND status = 'enabled'::status_t
);

COMMIT;
