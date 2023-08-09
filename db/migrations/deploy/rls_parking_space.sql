-- Deploy PH:rls_parking_space to pg
-- requires: table_parking_space

BEGIN;

  ALTER TABLE api.parking_space ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.parking_space
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.parking_space
  USING (
    owner_id = request.user_id()
  );

  CREATE POLICY select_enabled_rows ON api.parking_space FOR SELECT
  USING (TRUE);

COMMIT;
