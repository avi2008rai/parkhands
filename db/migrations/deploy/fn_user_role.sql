-- Deploy PH:fn_user_role to pg
-- requires: schema_request
-- requires: fn_jwt_claim

BEGIN;

CREATE OR REPLACE FUNCTION request.user_role() RETURNS TEXT AS
$$
  SELECT
  CASE
  WHEN (request.jwt_claim('role') = 'null'
        OR
        request.jwt_claim('role') = ''
        OR
        request.jwt_claim('role') IS NULL )
  THEN settings.get('auth.default-role')
  ELSE
    request.jwt_claim('role')::TEXT
  END;
$$ SECURITY DEFINER STABLE LANGUAGE SQL;

COMMIT;
