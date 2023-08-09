-- Deploy PH:fn_create_api_key to pg
-- requires: schema_api
-- requires: table_private_api_key

BEGIN;

CREATE TYPE api.create_api_key_input as (
  user_id       UUID
  , description TEXT
  , expire_at   INTERVAL
);

CREATE TYPE api.create_api_key_result as (
  id            UUID
  , user_id     UUID
  , api_key     TEXT
  , description TEXT
  , expire_at   TIMESTAMPTZ
  , created_at  TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION api.create_api_key(payload api.create_api_key_input)
  RETURNS api.create_api_key_result
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _user_id      UUID DEFAULT COALESCE(payload.user_id, request.user_id());
  _api_key      TEXT;
  _expire_at    TIMESTAMPTZ;
  _row          private.api_key%rowtype;
  _row_json     JSONB;
BEGIN

  PERFORM public.session_check();

  IF (payload.user_id IS NOT NULL AND NOT pg_catalog.pg_has_role(request.user_role(), 'app_super_admin', 'MEMBER')) THEN
    RAISE EXCEPTION USING ERRCODE = 'AK004'
      , DETAIL = 'Its prohibited to create api key for other users if you do not have admin privileges!';
  END IF;

  _api_key := util.hashid_encode(nextval('util.api_key'), 32);

  IF payload.expire_at IS NOT NULL THEN
    _expire_at := NOW() + payload.expire_at;
  END IF;

  INSERT INTO private.api_key(
    user_id
    , api_key
    , description
    , expire_at
  ) VALUES (
    _user_id
    , _api_key
    , payload.description
    , _expire_at
  ) RETURNING * INTO STRICT _row;

  SELECT INTO _row_json row_to_json(_row);
  _row_json := _row_json || jsonb_build_object('api_key', _api_key);

  RETURN json_populate_record(null::api.create_api_key_result, _row_json::json);

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.create_api_key(payload api.create_api_key_input) FROM public;

COMMENT ON FUNCTION api.create_api_key(payload api.create_api_key_input) IS 'create api_key for user';

-- set grants
GRANT EXECUTE ON FUNCTION api.create_api_key(payload api.create_api_key_input) TO base_single;

COMMIT;
