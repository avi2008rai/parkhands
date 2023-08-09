-- Deploy PH:fn_create_user to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

CREATE TYPE api.create_user_input as (
  name          TEXT
  , email       email
  , phone       phone_us
  , status      status_t
  , role        CITEXT
  , photo_url   TEXT
  , address     JSON
  , settings    JSON
);

CREATE OR REPLACE FUNCTION api.create_user(payload api.create_user_input)
  RETURNS api.user
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr               api.user%ROWTYPE;
  usr_json          JSONB;
  _user_id          UUID DEFAULT request.user_id();
  _user_role        TEXT DEFAULT request.user_role();
  _email            EMAIL DEFAULT payload.email;
  jwt_longevity     TEXT DEFAULT settings.get('jwt_longevity_activation');
  pl_role           TEXT DEFAULT COALESCE(payload.role, settings.get('auth.default-single-role'));
  pl_status         public.status_t
                    DEFAULT COALESCE((payload.status)::public.status_t, 'disabled'::public.status_t);
  activation_token  TEXT;
BEGIN

  PERFORM public.session_check();

  IF _email IS NULL THEN
    RAISE EXCEPTION 'Missing email in payload'
      USING ERRCODE = 'US001';
  END IF;

  SELECT INTO usr
    au.id
    , au.role
    FROM api.user AS au
    WHERE NOT au.deleted
      AND au.email = _email;

  IF usr.id IS NOT NULL THEN
    RAISE EXCEPTION 'Email is already registered in the application'
      USING ERRCODE = 'US003';
  ELSE

    IF NOT pg_catalog.pg_has_role(_user_role, 'app_super_admin', 'MEMBER') THEN
      RAISE EXCEPTION USING ERRCODE = 'US004'
        , DETAIL = 'Its prohibited to create users if you do not have admin privileges!';
    END IF;

    IF (NOT pg_catalog.pg_has_role(_user_role, 'app_super_admin', 'MEMBER') AND pl_role ILIKE 'app_super%') THEN
      RAISE EXCEPTION USING ERRCODE = 'US006'
        , DETAIL = 'Its prohibited to create super members if you are not super admin!';
    END IF;

    INSERT INTO api.user (
      name
    	, email
      , phone
    	, status
    	, role
      , photo_url
      , address
      , settings)
    VALUES (
     	payload.name
    	, payload.email
      , payload.phone
      , pl_status
      , pl_role
    	, payload.photo_url
    	, (payload.address)::JSON
    	, (payload.settings)::JSON)
    RETURNING * INTO STRICT usr;

    SELECT INTO usr_json row_to_json(usr);

    usr_json := usr_json || jsonb_build_object(
      'exp', extract(epoch FROM now())::INTEGER + jwt_longevity::INTEGER
    );

    SELECT INTO activation_token *
    FROM auth.sign_jwt(
      row_to_json(json_populate_record(
      	null::public.jwt_token
      	, usr_json::JSON
      ))
    );

    PERFORM util.pg_event_send(
      'user.insert'
      , json_build_object(
        'user', usr,
        'activation_token', activation_token
      )
    );

    RETURN usr;
  END IF;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.create_user(payload api.create_user_input) FROM public;

COMMENT ON FUNCTION api.create_user(payload api.create_user_input) IS 'register new user as admin';

-- set grants
GRANT EXECUTE ON FUNCTION api.create_user(payload api.create_user_input) TO base_super;

COMMIT;
