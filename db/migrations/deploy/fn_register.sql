-- Deploy PH:fn_register to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

DROP FUNCTION api.register(payload api.register_input);
DROP TYPE api.register_input;

CREATE TYPE api.register_input as (
  email email
  , password TEXT
  , name TEXT
  , phone phone_us
  , license_plate TEXT
  , role CITEXT
);

COMMENT ON COLUMN api.register_input.email IS E'@notNull';

CREATE OR REPLACE FUNCTION api.register(payload api.register_input)
  RETURNS public.jwt_token
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _user             api.user%rowtype;
  _role             CITEXT DEFAULT COALESCE(payload.role, settings.get('auth.default-single-role'));
  jwt_longevity     TEXT DEFAULT settings.get('jwt_longevity_login');
  user_json         JSONB;
  vehicle_size      UUID DEFAULT (SELECT id FROM api.vehicle_size ORDER BY weight ASC LIMIT 1);
  vehicle_type      UUID DEFAULT (SELECT id FROM api.vehicle_type ORDER BY weight ASC LIMIT 1);
BEGIN

  IF payload.email IS NULL THEN
    RAISE EXCEPTION 'email_not_provided' USING ERRCODE = 'MP400';
  END IF;

  IF _role NOT IN (settings.get('auth.default-single-role'), 'app_provider') THEN
    RAISE EXCEPTION 'invalid_role' USING ERRCODE = 'IR001';
  END IF;

  SELECT id INTO _user
    FROM api.user
  WHERE NOT deleted
    AND email = payload.email;

  IF _user.id IS NOT NULL THEN
    RAISE EXCEPTION 'user_already_exists' USING ERRCODE = 'US003';
  END IF;

  INSERT INTO api.user(
    name
    , email
    , phone
    , status
    , role
  ) VALUES (
    payload.name
    , payload.email
    , payload.phone
    , 'pending'::public.status_t
    , _role
  ) RETURNING * INTO STRICT _user;

  IF payload.license_plate IS NOT NULL THEN
    INSERT INTO api.vehicle(
      owner_id
      , name
      , license_plate
      , vehicle_size_id
      , vehicle_type_id
    ) VALUES (
      _user.id
      , payload.license_plate
      , payload.license_plate
      , vehicle_size
      , vehicle_type
    );
  END IF;

  IF payload.password IS NOT NULL THEN
    UPDATE private.user
      SET password = payload.password
    WHERE id = _user.id;
  END IF;

  SELECT INTO user_json row_to_json(_user);

  user_json := user_json || jsonb_build_object(
    'exp', extract(epoch FROM now())::INTEGER + jwt_longevity::INTEGER
  );

  PERFORM util.pg_event_send(
    'user.insert'
    , json_build_object(
      'user', user_json
      , 'activation_token', auth.sign_jwt(
          row_to_json(
            json_populate_record(null::public.jwt_token, user_json::json)
          )
        )
    )
  );

  RETURN json_populate_record(null::public.jwt_token, user_json::json);
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.register(payload api.register_input) FROM public;

COMMENT ON FUNCTION api.register(payload api.register_input) IS 'register new user';
-- set grants
GRANT EXECUTE ON FUNCTION api.register(payload api.register_input) TO app_anonymous;

COMMIT;
