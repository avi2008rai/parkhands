-- Deploy PH:fn_resend_activation_email to pg
-- requires: schema_api
-- requires: table_user

BEGIN;

CREATE OR REPLACE FUNCTION api.resend_activation_email(requested_email email)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $fn_block$
DECLARE
  _user               api.user%ROWTYPE;
  _user_json          JSONB;
  _activation_token   TEXT;
  _jwt_longevity      TEXT DEFAULT settings.get('jwt_longevity_login');
BEGIN

  SELECT * INTO _user
    FROM api.user AS au
  WHERE NOT au.deleted
    AND au.email = requested_email
    AND au.status = 'pending';

  IF (_user.id IS NULL) THEN
    RAISE EXCEPTION 'user_already_activated_or_unavailable' USING ERRCODE = 'UA404';
  END IF;

  SELECT INTO _user_json row_to_json(_user);

   _user_json := _user_json || jsonb_build_object(
    'exp', extract(epoch FROM now())::INTEGER + _jwt_longevity::INTEGER
  );

  _activation_token := auth.sign_jwt(
    row_to_json(
      json_populate_record(null::public.jwt_token, _user_json::json)
    )
  );

  PERFORM util.pg_event_send(
    'user.resend_activation_email',
    json_build_object(
      'user', _user_json,
      'activation_token', _activation_token
    )
  );

  RETURN TRUE;

END $fn_block$;

REVOKE ALL PRIVILEGES ON FUNCTION api.resend_activation_email(requested_email email) FROM public;

COMMENT ON FUNCTION api.resend_activation_email(requested_email email) IS 'Resend activation email on demand';

GRANT EXECUTE ON FUNCTION api.resend_activation_email(requested_email email) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.resend_activation_email(requested_email email) TO base_super;

COMMIT;
