-- Deploy PH:fn_user_id to pg
-- requires: schema_request
-- requires: extension_uuid
-- requires: fn_jwt_claim

BEGIN;

  CREATE FUNCTION request.user_id() RETURNS UUID AS
  $$
    SELECT
    CASE request.jwt_claim('id')
    WHEN '' THEN NULL
    ELSE request.jwt_claim('id')::UUID
	END
  $$ STABLE LANGUAGE SQL;

COMMIT;
