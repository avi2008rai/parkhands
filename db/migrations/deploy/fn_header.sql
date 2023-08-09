-- Deploy PH:fn_header to pg
-- requires: schema_request
-- requires: fn_env_var

BEGIN;

  CREATE FUNCTION request.header(h TEXT) RETURNS TEXT AS
  $$
    SELECT request.env_var('http.headers.' || h);
  $$ STABLE LANGUAGE SQL;

COMMIT;
