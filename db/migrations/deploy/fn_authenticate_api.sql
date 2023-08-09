-- Deploy PH:fn_authenticate_api to pg
-- requires: schema_api
-- requires: table_private_api_key

BEGIN;

CREATE OR REPLACE FUNCTION api.authenticate_api(api_key TEXT)
  RETURNS JSON
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr           RECORD;
  usr_json      JSONB;
  token         RECORD;
  _api_key      TEXT DEFAULT api_key;
  _api_token    TEXT;
  _result       JSON;
BEGIN

  IF _api_key IS NULL THEN
    RAISE EXCEPTION 'Missing "%" in payload', 'api_key'
      USING ERRCODE = 'AK404';
  END IF;

  SELECT INTO usr
    au.id
    , au.role
    , pak.id AS api_key_id
    , pak.expire_at
    FROM api.user AS au
    JOIN private.api_key AS pak ON au.id = pak.user_id
    WHERE NOT au.deleted
      AND pak.api_key = public.crypt(_api_key, pak.api_key)
      AND au.status = 'enabled';

  IF usr.id IS NULL THEN
    RAISE EXCEPTION 'API key does not exist'
      USING ERRCODE = 'UL404';
  ELSEIF (usr.expire_at IS NOT NULL AND usr.expire_at < NOW()) THEN
    RAISE EXCEPTION 'API key has expired'
      USING ERRCODE = 'AP404';
  ELSE
    SELECT INTO usr_json
      row_to_json(usr);

    -- Check if token is already generated
    SELECT
      pat.*
      FROM private.api_token AS pat
      WHERE pat.api_key_id = usr.api_key_id
    INTO token;

    IF (token IS NOT NULL AND token.expire_at > EXTRACT(EPOCH FROM NOW())) THEN
      _api_token := token.api_token;
    ELSE
      -- Delete previous entries when expired
      DELETE FROM private.api_token WHERE api_key_id = token.api_key_id;

      -- Generate and save token if not exist
      usr_json := usr_json::jsonb || jsonb_build_object(
        'exp', extract(epoch FROM now())::INTEGER + settings.get('jwt_longevity_rememberme')::INTEGER
      );

      SELECT * FROM auth.sign_jwt(
        row_to_json(json_populate_record(
          null::public.jwt_token
          , usr_json::JSON
        ))
      ) INTO _api_token;

      INSERT INTO private.api_token
        (api_key_id, api_token, expire_at)
        VALUES
        (usr.api_key_id, _api_token, (usr_json->'exp')::INTEGER);

    END IF;

    _result := json_build_object(
      'token', _api_token,
      'user', usr_json - 'expire_at'
    );

    RETURN _result;
  END IF;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.authenticate_api(api_key TEXT) FROM public;

COMMENT ON FUNCTION api.authenticate_api(api_key TEXT) IS 'authenticate using api_key';

-- set grants
GRANT EXECUTE ON FUNCTION api.authenticate_api(api_key text) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.authenticate_api(api_key text) TO base_single;

COMMIT;
