-- Deploy PH:fn_reset_password to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id

BEGIN;

CREATE OR REPLACE FUNCTION api.reset_password(payload JSON)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  user_id           UUID DEFAULT request.user_id();
  new_password      TEXT DEFAULT payload->>'new_password';
BEGIN

  IF  user_id IS NOT NULL THEN
    IF new_password IS NOT NULL THEN

      UPDATE private.user SET
        password = new_password
      WHERE id = user_id;

      RETURN TRUE;
    END IF;
  END IF;

  RETURN FALSE;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.reset_password(payload JSON) FROM public;

COMMENT ON FUNCTION api.reset_password(payload JSON) IS 'reset password using JWT via forgot_password';

-- set grants
GRANT EXECUTE ON FUNCTION api.reset_password(payload JSON) TO base_single;

COMMIT;
