-- Deploy PH:rls_vehicle to pg
-- requires: table_vehicle

BEGIN;

  ALTER TABLE api.vehicle ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.vehicle
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.vehicle
  USING (
    owner_id = request.user_id()
  );

COMMIT;
