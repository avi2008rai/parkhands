-- Deploy PH:fn_get_api_keys to pg
-- requires: schema_api
-- requires: table_private_api_key

BEGIN;

CREATE TYPE api.get_api_keys_result as (
  id            UUID
  , user_id     UUID
  , description TEXT
  , expire_at   TIMESTAMPTZ
  , created_at  TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION api.get_api_keys(user_id UUID)
  RETURNS SETOF api.get_api_keys_result
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _user_id      UUID DEFAULT COALESCE(user_id, request.user_id());
BEGIN

  PERFORM public.session_check();

  IF (_user_id IS NOT NULL AND NOT pg_catalog.pg_has_role(request.user_role(), 'app_super_admin', 'MEMBER')) THEN
    RAISE EXCEPTION USING ERRCODE = 'AK004'
      , DETAIL = 'Its prohibited to get api key for other users if you do not have admin privileges!';
  END IF;

  RETURN QUERY
    SELECT
      ak.id
      , ak.user_id
      , ak.description
      , ak.expire_at
      , ak.created_at
    FROM private.api_key AS ak
    WHERE ak.user_id = _user_id
    ORDER BY ak.created_at ASC;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.get_api_keys(UUID) FROM public;

COMMENT ON FUNCTION api.get_api_keys(UUID) IS 'get list of api keys for user';

-- set grants
GRANT EXECUTE ON FUNCTION api.get_api_keys(UUID) TO base_single;

COMMIT;
