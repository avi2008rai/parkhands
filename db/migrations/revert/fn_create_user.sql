-- Deploy PH:fn_create_user to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

  DROP FUNCTION IF EXISTS api.create_user(payload api.create_user_input);
  DROP TYPE IF EXISTS api.create_user_input;

COMMIT;
