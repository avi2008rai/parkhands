-- Deploy PH:fn_sign_jwt to pg
-- requires: schema_auth
-- requires: extension_pgjwt
-- requires: fn_settings_get

BEGIN;

  CREATE FUNCTION auth.sign_jwt(JSON) RETURNS TEXT AS
  $$
    SELECT public.sign($1, settings.get('jwt_secret'))
  $$ STABLE LANGUAGE SQL;

  -- by default all functions are accessible to the public, we need to remove that
  -- and define our specific access rules
  REVOKE ALL PRIVILEGES ON FUNCTION auth.sign_jwt(json) FROM public;

COMMIT;
