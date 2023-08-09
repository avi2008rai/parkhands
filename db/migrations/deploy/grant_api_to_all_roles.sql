-- Deploy PH:grant_api_to_all_roles to pg
-- requires: schema_api

BEGIN;

GRANT USAGE ON SCHEMA api TO
  app_anonymous
  , base_single;

COMMIT;
