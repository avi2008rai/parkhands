-- Deploy PH:fn_forgot_password to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

CREATE TYPE api.forgot_password_input as (
  email           email
);

CREATE OR REPLACE FUNCTION api.forgot_password(payload api.forgot_password_input)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr           RECORD;
  jwt_longevity TEXT DEFAULT settings.get('jwt_longevity_forgot_password');
  forgot_password_token TEXT;
BEGIN

  IF payload.email IS NULL THEN
    RAISE EXCEPTION 'Missing "%" key in payload', 'email'
      USING ERRCODE = 'UFP01';
  ELSE
    SELECT INTO usr
      au.id
      , au.name
      , au.email
      , au.role
      , au.status
      FROM api.user AS au
      WHERE NOT au.deleted
        AND au.email = payload.email;

    IF usr.id IS NULL THEN
      RAISE EXCEPTION 'We did not find an account with this email address. Please check the entered email and try again.'
        USING ERRCODE = 'UFP02';
    END IF;

    IF usr.status = 'disabled'::PUBLIC.status_t THEN
      RAISE EXCEPTION 'We found your account, but it is not active. Please use your activation email to activate it or contact your administrator for assistance.'
        USING ERRCODE = 'UFP03';
    END IF;

    SELECT INTO usr
      row_to_json(usr) AS j;

    usr.j := usr.j::jsonb || jsonb_build_object(
      'exp', extract(epoch FROM now())::INTEGER + jwt_longevity::INTEGER
    );

    SELECT INTO forgot_password_token
      * FROM auth.sign_jwt(
          row_to_json(json_populate_record(null::public.jwt_token, usr.j)));

    PERFORM util.pg_event_send(
      'user.forgot_password'
      , json_build_object(
        'user', usr.j,
        'forgot_password_token', forgot_password_token
      )
    );

    RETURN TRUE;
  END IF;

  RETURN FALSE;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.forgot_password(payload api.forgot_password_input) FROM public;

-- set grants
GRANT EXECUTE ON FUNCTION api.forgot_password(payload api.forgot_password_input) TO app_anonymous;

COMMIT;
