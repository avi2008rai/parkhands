-- Deploy PH:grants_parking_space_availability to pg
-- requires: table_parking_space_availability

BEGIN;

  GRANT SELECT ON api.parking_space_availability TO app_anonymous;

  GRANT SELECT ON api.parking_space_availability TO base_single;
  GRANT DELETE ON api.parking_space_availability TO base_single;

  GRANT INSERT (
     parking_space_id
    , from_date
    , to_date
    , default_flag
    , closed_flag
    , created_at
    , updated_at
  ) ON api.parking_space_availability TO base_single;

  GRANT UPDATE (
    parking_space_id
    , from_date
    , to_date
    , default_flag
    , closed_flag
    , created_at
    , updated_at
  ) ON api.parking_space_availability TO base_single;

  GRANT SELECT ON api.parking_space_availability TO base_super;
  GRANT INSERT ON api.parking_space_availability TO base_super;
  GRANT UPDATE ON api.parking_space_availability TO base_super;
  GRANT DELETE ON api.parking_space_availability TO base_super;

COMMIT;
