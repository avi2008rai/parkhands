-- Deploy PH:fn_jwt_claim to pg
-- requires: schema_request
-- requires: fn_env_var

BEGIN;

  CREATE FUNCTION request.jwt_claim(c TEXT) RETURNS TEXT AS
  $$
    SELECT request.env_var('jwt.claims.' || c);
  $$ STABLE LANGUAGE SQL;

COMMIT;
