-- Deploy PH:rls_user to pg
-- requires: table_user
-- requires: grant_user
-- requires: fn_user_id
-- requires: fn_user_role
-- requires: fn_org_id

BEGIN;

DROP POLICY select_booking_user ON api.user;

COMMIT;
