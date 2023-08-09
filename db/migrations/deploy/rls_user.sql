-- Deploy PH:rls_user to pg
-- requires: table_user
-- requires: grant_user
-- requires: fn_user_id
-- requires: fn_user_role
-- requires: fn_org_id

BEGIN;

CREATE POLICY select_booking_user ON api.user FOR SELECT
USING (
  id IN (
    SELECT 
      sb.user_id
    FROM api.slot_bookings AS sb
    LEFT JOIN api.slot AS sl ON sb.slot_id = sl.id
    WHERE 
      sl.owner_id = request.user_id()
      AND sb.status != 'canceled'::booking_status_t
      AND NOT sl.deleted
  )
  AND NOT deleted
  AND status = 'enabled'::status_t
);

COMMIT;
