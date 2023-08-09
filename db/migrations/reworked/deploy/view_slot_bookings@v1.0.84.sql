-- Deploy PH:view_slot_bookings to pg
-- requires: table_slot_booking

BEGIN;

  CREATE OR REPLACE VIEW api.slot_bookings
    (
      id
      , slot_id
      , user_id
      , status
      , license_plate
      , start_time
      , end_time
      , created_at
    ) AS
    SELECT
      ts_sb.id
      , ts_sb.slot_id
      , ts_sb.user_id
      , ts_sb.status
      , ts_sb.license_plate
      , ts_sb.start_time
      , ts_sb.end_time
      , ts_sb.created_at
    FROM timescale.slot_booking ts_sb;

  COMMENT ON VIEW api.slot_bookings IS E'@primaryKey id\n@foreignKey (slot_id) references api.slot (id)\n@foreignKey (user_id) references api.user (id)';

  -- Needed for RLS to work
  ALTER VIEW api.slot_bookings OWNER TO base_single;

  -- by default previous line grants all
  REVOKE ALL PRIVILEGES ON api.slot_bookings  FROM base_single;

  -- grant only wanted access to base_single
  GRANT SELECT ON api.slot_bookings TO base_single;

  GRANT UPDATE (
    status
  ) ON api.slot_bookings TO base_single;

COMMIT;
