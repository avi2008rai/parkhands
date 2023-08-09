-- Deploy PH:fn_user_premium to pg
-- requires: schema_api
-- requires: table_user

BEGIN;

CREATE OR REPLACE FUNCTION api.user_premium(user_id UUID)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $fn_block$
DECLARE
  _user           api.user%ROWTYPE;
BEGIN
  SELECT * INTO _user
    FROM api.user AS au
  WHERE NOT au.deleted
    AND au.id = user_id
    AND (
      au.status = 'enabled'
      OR au.status = 'pending'
    );

  IF (_user.id IS NOT NULL) AND (_user.role = 'app_provider_premium') THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END $fn_block$;

COMMENT ON FUNCTION api.user_premium(user_id UUID) IS 'Get a boolean flag, depending on user role, premium returns true';

COMMIT;
