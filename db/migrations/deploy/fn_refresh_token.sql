-- Deploy PH:fn_refresh_token to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

CREATE OR REPLACE FUNCTION api.refresh_token()
  RETURNS public.jwt_token
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr           RECORD;
  jwt_longevity TEXT DEFAULT settings.get('jwt_longevity_login');
  remember_me   BOOLEAN DEFAULT (payload->>'remember_me')::boolean;
BEGIN

  SELECT INTO usr
    au.id
    , au.role
    , au.org_id
    , au.user_type_id
    FROM api.user AS au
    WHERE NOT au.deleted
      AND au.id = request.user_id()
      AND (au.status = 'enabled' OR au.status = 'pending');

  IF usr.id IS NULL THEN
      RAISE EXCEPTION 'Invalid user' USING ERRCODE = 'UL401';
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

REVOKE ALL PRIVILEGES ON FUNCTION api.refresh_token() FROM public;

-- set grants
GRANT EXECUTE ON FUNCTION api.refresh_token() TO base_single;

COMMIT;
