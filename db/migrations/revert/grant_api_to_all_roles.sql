-- Revert PH:grant_api_to_all_roles to pg

BEGIN;

REVOKE USAGE ON SCHEMA api FROM
  app_anonymous
  , base_single;

COMMIT;
