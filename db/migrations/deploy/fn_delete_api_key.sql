-- Deploy PH:fn_delete_api_key to pg
-- requires: schema_api
-- requires: table_private_api_key

BEGIN;

CREATE OR REPLACE FUNCTION api.delete_api_key(api_key_id UUID)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _api_key_id   UUID DEFAULT api_key_id;
  _user_id      UUID DEFAULT request.user_id();
  _api_key      private.api_key%rowtype;
BEGIN

  PERFORM public.session_check();

  IF _api_key_id IS NULL THEN
    RAISE EXCEPTION 'Missing "%" in payload', 'id'
      USING ERRCODE = 'AK404';
  END IF;

  SELECT
    ak.id
    , ak.user_id
    , ak.description
    , ak.expire_at
    , ak.created_at
  FROM private.api_key AS ak
  WHERE ak.id = _api_key_id
  INTO _api_key;


  IF _api_key.id IS NULL THEN
    RAISE EXCEPTION 'API key does not exist'
      USING ERRCODE = 'AK404';
  END IF;

  IF (_api_key.user_id <> _user_id AND NOT pg_catalog.pg_has_role(request.user_role(), 'app_super_admin', 'MEMBER')) THEN
    RAISE EXCEPTION USING ERRCODE = 'AK004'
      , DETAIL = 'Its prohibited to delete api key for other users if you do not have admin privileges!';
  END IF;

  DELETE FROM private.api_key WHERE id = _api_key_id;

  RETURN TRUE;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.delete_api_key(api_key_id UUID) FROM public;

COMMENT ON FUNCTION api.delete_api_key(api_key_id UUID) IS 'delete api_key for user';

-- set grants
GRANT EXECUTE ON FUNCTION api.delete_api_key(api_key_id UUID) TO base_single;

COMMIT;
