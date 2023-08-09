-- Deploy PH:grants_parking_space to pg
-- requires: table_parking_space

BEGIN;

  GRANT SELECT ON api.parking_space TO app_anonymous;
  GRANT SELECT ON api.parking_space TO base_single;
  GRANT SELECT ON api.parking_space TO app_provider;

  GRANT SELECT ON api.parking_space TO app_provider_premium;
  GRANT DELETE ON api.parking_space TO app_provider_premium;

  GRANT INSERT (
    owner_id
    , name
    , description
    , photo_url
    , settings
    , address
    , location
  ) ON api.parking_space TO app_provider_premium;

  GRANT UPDATE (
    owner_id
    , name
    , description
    , photo_url
    , settings
    , address
    , location
  ) ON api.parking_space TO app_provider_premium;

  GRANT SELECT ON api.parking_space TO base_super;
  GRANT INSERT ON api.parking_space TO base_super;
  GRANT UPDATE ON api.parking_space TO base_super;
  GRANT DELETE ON api.parking_space TO base_super;

COMMIT;
