-- Deploy PH:grants_slot to pg
-- requires: table_slot

BEGIN;

  GRANT SELECT ON api.slot TO app_anonymous;

  GRANT SELECT ON api.slot TO base_single;
  GRANT DELETE ON api.slot TO base_single;

  GRANT INSERT (
    name
    , owner_id
    , vehicle_size_id
    , address
    , timezone
    , price_per_hour
    , status
    , photo_url
    , description
    , notes
    , location
    , notes
  ) ON api.slot TO base_single;

  GRANT UPDATE (
    name
    , owner_id
    , vehicle_size_id
    , address
    , timezone
    , price_per_hour
    , status
    , photo_url
    , description
    , notes
    , location
    , notes
  ) ON api.slot TO base_single;

  GRANT SELECT ON api.slot TO base_super;
  GRANT INSERT ON api.slot TO base_super;
  GRANT UPDATE ON api.slot TO base_super;
  GRANT DELETE ON api.slot TO base_super;

COMMIT;
