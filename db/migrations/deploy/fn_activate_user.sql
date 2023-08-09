-- Deploy PH:fn_activate_user to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

CREATE TYPE api.activate_user_input AS (
  password          TEXT
  , password2       TEXT
);

CREATE OR REPLACE FUNCTION api.activate_user(payload api.activate_user_input)
  RETURNS public.jwt_token
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr           RECORD;
  private_usr   RECORD;
  user_json     JSON;
  _user_id      UUID DEFAULT request.user_id();
  jwt_longevity TEXT DEFAULT settings.get('jwt_longevity_login');
BEGIN

  PERFORM public.session_check();

  IF payload.password IS NULL THEN
    RAISE EXCEPTION 'password_missing' USING ERRCODE = 'PM002';
  END IF;

  IF payload.password != payload.password2 THEN
    RAISE EXCEPTION 'password_mismatch' USING ERRCODE = 'PM001';
  END IF;

  SELECT INTO usr
    au.id
    , au.role
    , au.status
    FROM api.user AS au
    WHERE NOT au.deleted
      AND au.id = _user_id;

  SELECT INTO private_usr
    pu.id
    FROM private.user AS pu
    WHERE pu.id = _user_id;

  IF usr.id IS NULL THEN
    RAISE EXCEPTION 'user_not_found' USING ERRCODE = 'UA001';
  ELSE
    IF usr.status = 'enabled' THEN
      RAISE EXCEPTION 'user_already_activated'
      USING ERRCODE = 'UA002';
    END IF;

    -- Update users password, set by a trigger initially
    UPDATE private.user
      SET password = payload.password
    WHERE id = _user_id;


    UPDATE api.user
       SET status = 'enabled'::status_t,
           email_confirmed = true
    WHERE id = _user_id
    RETURNING * INTO STRICT usr;

    SELECT INTO user_json row_to_json(usr);

    user_json := user_json::jsonb || jsonb_build_object(
      'exp', extract(epoch FROM now())::INTEGER + jwt_longevity::INTEGER
    );

    RETURN json_populate_record(null::public.jwt_token, user_json);
  END IF;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.activate_user(payload api.activate_user_input) FROM public;

COMMENT ON FUNCTION api.activate_user(payload api.activate_user_input) IS 'Confirm user account';

-- set grants
GRANT EXECUTE ON FUNCTION api.activate_user(payload api.activate_user_input) TO base_single;

COMMIT;
