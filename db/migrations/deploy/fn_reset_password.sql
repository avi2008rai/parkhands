-- Deploy PH:fn_reset_password to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id

BEGIN;

DROP FUNCTION IF EXISTS api.reset_password(payload JSON);

CREATE TYPE api.reset_password_input AS (
  password          TEXT
);

CREATE OR REPLACE FUNCTION api.reset_password(payload api.reset_password_input)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _user     api.user;
BEGIN

  IF payload.password IS NULL THEN
    RAISE EXCEPTION 'password_missing' USING ERRCODE = 'PM002';
  END IF;

  SELECT INTO _user *
    FROM api.user AS au
  WHERE NOT au.deleted
    AND au.id = request.user_id();

  IF _user.status = 'disabled'::status_t THEN
    RAISE EXCEPTION 'user_is_disabled'
    USING ERRCODE = 'PM003';
  END IF;

  IF  _user.id IS NOT NULL THEN
    UPDATE private.user SET
      password = payload.password
    WHERE id = _user.id;

    UPDATE api.user SET
      status = 'enabled'::status_t,
      email_confirmed = true
    WHERE id = _user.id;

    RETURN TRUE;
  END IF;

  RETURN FALSE;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.reset_password(payload api.reset_password_input) FROM public;

COMMENT ON FUNCTION api.reset_password(payload api.reset_password_input) IS 'reset password using JWT via forgot_password';

-- set grants
GRANT EXECUTE ON FUNCTION api.reset_password(payload api.reset_password_input) TO base_single;

COMMIT;
