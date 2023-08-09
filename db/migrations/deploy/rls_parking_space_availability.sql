-- Deploy PH:rls_parking_space_availability to pg
-- requires: parking_space_availability

BEGIN;

ALTER TABLE api.parking_space_availability ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.parking_space_availability
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.parking_space_availability
  USING (
    parking_space_id IN (SELECT id FROM api.parking_space WHERE owner_id = request.user_id())
  );

  CREATE POLICY select_enabled_rows ON api.parking_space_availability FOR SELECT
  USING (
    parking_space_id IN (SELECT id FROM api.parking_space WHERE status = 'enabled'::parking_space_status AND NOT deleted)
  );

COMMIT;
