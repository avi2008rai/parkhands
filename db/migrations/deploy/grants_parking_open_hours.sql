-- Deploy PH:grants_parking_open_hours to pg

BEGIN;

GRANT SELECT ON api.parking_open_hours TO app_anonymous;

  GRANT SELECT ON api.parking_open_hours TO base_single;
  GRANT DELETE ON api.parking_open_hours TO base_single;

  GRANT INSERT (
    parking_space_availability_id
    , day_of_week
    , from_time
    , to_time
    , price
    , currency
    , created_at
    , updated_at
  ) ON api.parking_open_hours TO base_single;

  GRANT UPDATE (
    parking_space_availability_id
    , day_of_week
    , from_time
    , to_time
    , price
    , currency
    , created_at
    , updated_at
  ) ON api.parking_open_hours TO base_single;

  GRANT SELECT ON api.parking_open_hours TO base_super;
  GRANT INSERT ON api.parking_open_hours TO base_super;
  GRANT UPDATE ON api.parking_open_hours TO base_super;
  GRANT DELETE ON api.parking_open_hours TO base_super;

COMMIT;
