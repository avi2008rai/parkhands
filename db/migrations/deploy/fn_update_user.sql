-- Deploy PH:fn_update_user to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

DROP FUNCTION api.update_user(payload api.update_user_input);
DROP TYPE api.update_user_input;

CREATE TYPE api.update_user_input as (
  id                  UUID
  , name              TEXT
  , email             email
  , password          TEXT
  , phone             phone_us
  , status            status_t
  , role              CITEXT
  , photo_url         TEXT
  , address           JSON
  , settings          JSON
  , email_confirmed   BOOLEAN
);

CREATE OR REPLACE FUNCTION api.update_user(payload api.update_user_input)
  RETURNS api.user
  SECURITY DEFINER
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr           api.user%ROWTYPE;
  _payload_id   UUID DEFAULT (payload.id)::UUID;
  _user_id      UUID DEFAULT request.user_id();
  _user_role    TEXT DEFAULT request.user_role();
BEGIN

  PERFORM public.session_check();

  IF _payload_id IS NULL THEN
    RAISE EXCEPTION 'Missing id key in payload' USING ERRCODE = 'US001';
  END IF;

  SELECT INTO usr *
    FROM api.user AS au
    WHERE NOT au.deleted
      AND au.id = _payload_id;

  IF usr.id IS NULL THEN
    RAISE EXCEPTION 'User not found!' USING ERRCODE = 'US002';
  ELSE
    IF usr.id <> _user_id THEN
      -- update another user
      IF NOT pg_catalog.pg_has_role(_user_role, 'base_super', 'MEMBER') THEN
        RAISE EXCEPTION USING ERRCODE = 'US004'
          , DETAIL = 'Its prohibited to update users if you do not have admin privileges!';
      END IF;

      IF (_user_role <> 'app_super_admin' AND usr.role ILIKE 'app_super%') THEN
        RAISE EXCEPTION USING ERRCODE = 'US006'
          , DETAIL = 'Its prohibited to update super members if you are not super admin!';
      END IF;
    ELSE
      -- update own user
      IF ((payload.status)::public.status_t <> 'enabled'::public.status_t) THEN
        RAISE EXCEPTION USING ERRCODE = 'US005'
          , DETAIL = 'Its prohibited to update user status!';
      END IF;

      -- update email confirmed to false
      IF (payload.email_confirmed <> TRUE) THEN
        RAISE EXCEPTION USING ERRCODE = 'US007', DETAIL = 'no_revoke_email_confirmation';
      END IF;
    END IF;

    -- update query
    UPDATE api.user
    SET name = m.name
        , email = m.email
        , phone = m.phone
        , status = m.status
        , role = m.role
        , photo_url = m.photo_url
        , address = m.address
        , settings = m.settings
        , email_confirmed = m.email_confirmed
       FROM (
         SELECT
           COALESCE(payload.id, os.id) AS id
           , COALESCE(payload.name, os.name) AS name
           , COALESCE(payload.email, os.email) AS email
           , COALESCE(payload.phone, os.phone) AS phone
           , COALESCE(payload.status, os.status) AS status
           , COALESCE(payload.role, os.role) AS role
           , COALESCE(payload.photo_url, os.photo_url) AS photo_url
           , COALESCE(payload.address, os.address) AS address
           , COALESCE(payload.settings, os.settings) AS settings
           , COALESCE(payload.email_confirmed, os.email_confirmed) AS email_confirmed
           FROM (SELECT * FROM api.user WHERE id = usr.id) AS os
       ) AS M
       WHERE api.user.id = M.id
      RETURNING * INTO STRICT usr;

    IF payload.password IS NOT NULL THEN
      UPDATE private.user
         SET password = payload.password
       WHERE id = usr.id;
    END IF;

    RETURN usr;
  END IF;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.update_user(payload api.update_user_input) FROM public;

COMMENT ON FUNCTION api.update_user(payload api.update_user_input) IS 'update own user or another user as admin';

-- set grants
GRANT EXECUTE ON FUNCTION api.update_user(payload api.update_user_input) TO base_single;

COMMIT;
