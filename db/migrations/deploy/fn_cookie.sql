-- Deploy PH:fn_cookie to pg
-- requires: schema_request
-- requires: fn_env_var

BEGIN;

  CREATE FUNCTION request.cookie(c TEXT) RETURNS TEXT AS
  $$
    SELECT request.env_var('http.cookie.' || c);
  $$ STABLE LANGUAGE SQL;

COMMIT;
