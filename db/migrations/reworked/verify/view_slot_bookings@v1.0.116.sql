-- Verify PH:view_slot_bookings on pg

BEGIN;

  SELECT
    id
    , slot_id
    , user_id
    , status
    , license_plate
    , phone
    , start_time
    , end_time
    , created_at
  FROM api.slot_bookings
    WHERE FALSE;

ROLLBACK;

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege(
    'base_single'
    , 'api.slot_bookings'
    , 'SELECT'
  ));

END $$;
