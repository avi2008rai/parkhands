-- Deploy PH:fn_env_var to pg
-- requires: schema_request

BEGIN;

  CREATE FUNCTION request.env_var(v TEXT) RETURNS TEXT AS
  $$
    SELECT current_setting(v, true);
  $$ STABLE LANGUAGE SQL;

COMMIT;
