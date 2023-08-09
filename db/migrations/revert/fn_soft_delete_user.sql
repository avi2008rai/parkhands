-- Deploy PH:fn_soft_delete_user to pg
-- requires: schema_util
-- requires: fn_settings_get
-- requires: table_user

BEGIN;

CREATE OR REPLACE FUNCTION util.soft_delete_user() RETURNS TRIGGER AS
  $$
  DECLARE
    anon_email     TEXT DEFAULT MD5(random()::text) || '@example.anon';
    anon_name      TEXT DEFAULT 'anonymous';
    user_id        TEXT DEFAULT request.user_id();
    user_role      TEXT DEFAULT request.user_role();
  BEGIN
    -- admin deletion prohibited
    IF (old.role = 'app_super_admin') THEN
      RETURN NULL;
    END IF;

    EXECUTE 'UPDATE api.user SET deleted = TRUE, deleted_at = $1, email = $2, name = $3, photo_url = $4 WHERE id = $5'
    USING now(), anon_email, anon_name, NULL, old.id;
    RETURN NULL;
  END;
$$
LANGUAGE plpgsql security definer;

COMMIT;
