-- Deploy PH:grants_business to pg
-- requires: table_business

BEGIN;

  GRANT SELECT ON api.business TO app_anonymous;
  GRANT SELECT ON api.business TO base_single;
  GRANT SELECT ON api.business TO app_provider;

  GRANT SELECT ON api.business TO app_provider_premium;
  GRANT DELETE ON api.business TO app_provider_premium;

  GRANT INSERT (
    owner_id
    , name
    , description
    , photo_url
    , marker_url
    , address
    , location
  ) ON api.business TO app_provider_premium;

  GRANT UPDATE (
    owner_id
    , name
    , description
    , photo_url
    , marker_url
    , address
    , location
  ) ON api.business TO app_provider_premium;

  GRANT SELECT ON api.business TO base_super;
  GRANT INSERT ON api.business TO base_super;
  GRANT UPDATE ON api.business TO base_super;
  GRANT DELETE ON api.business TO base_super;

COMMIT;
