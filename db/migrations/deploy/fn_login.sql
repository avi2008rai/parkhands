-- Deploy PH:fn_login to pg
-- requires: table_user
-- requires: fn_settings_get
-- requires: fn_user_id
-- requires: type_status

BEGIN;

CREATE TYPE api.login_input as (
  email           email
  , password      TEXT
  , remember_me   BOOLEAN
);

CREATE OR REPLACE FUNCTION api.login(payload api.login_input)
  RETURNS public.jwt_token
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr           RECORD;
  _email        CITEXT DEFAULT payload.email;
  _password     TEXT DEFAULT payload.password;
  jwt_longevity TEXT DEFAULT settings.get('jwt_longevity_login');
  remember_me   BOOLEAN DEFAULT (payload.remember_me)::boolean;
BEGIN

  IF _email IS NULL THEN
    RAISE EXCEPTION 'Missing "%" key in payload', 'email'
      USING ERRCODE = 'UL001';
  END IF;

  IF _email !~ '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$' THEN
    RAISE EXCEPTION 'Email is invalid'
      USING ERRCODE = 'UL401';
  END IF;

  IF _password IS NULL THEN
    RAISE EXCEPTION 'Missing "%" key in payload', 'password'
      USING ERRCODE = 'UL002';
  END IF;

  SELECT INTO usr
    au.id
    , au.role
    FROM api.user AS au
    JOIN private.user AS pu ON au.ID = pu.ID
    WHERE NOT au.deleted
      AND au.email = _email
      AND pu.password = public.crypt(_password, pu.password)
      AND (au.status = 'enabled' OR au.status = 'pending');

  IF usr.id IS NULL THEN
    RAISE EXCEPTION 'User not found with provided email and password'
      USING ERRCODE = 'UL404';
  ELSE

    SELECT INTO usr
      row_to_json(usr) AS j;

    IF (remember_me) THEN
      jwt_longevity := settings.get('jwt_longevity_rememberme');
    END IF;

    usr.j := usr.j::jsonb || jsonb_build_object(
      'exp', extract(epoch FROM now())::INTEGER + jwt_longevity::INTEGER
    );

    RETURN json_populate_record(null::public.jwt_token, usr.j);
  END IF;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.login(payload api.login_input) FROM public;

COMMENT ON FUNCTION api.login(payload api.login_input) IS 'login user into system';

-- set grants
GRANT EXECUTE ON FUNCTION api.login(payload api.login_input) TO app_anonymous;

COMMIT;
