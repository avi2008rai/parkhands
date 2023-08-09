-- Deploy PH:fn_update_role_on_subscription to pg
-- requires: schema_util

BEGIN;

CREATE OR REPLACE FUNCTION util.update_role_on_subscription()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
AS
$fn_block$
  DECLARE
    _user          api.user%ROWTYPE;
    _new_role      CITEXT;
  BEGIN

    SELECT INTO _user
      au.*
    FROM api.user au
    WHERE au.id = NEW.user_id;

    IF _user.id IS NULL THEN
      RAISE EXCEPTION 'user_not_found' USING ERRCODE = 'UE404';
    END IF;

    IF NEW.status = 'active' THEN
      _new_role := 'app_provider_premium';
    ELSE
      _new_role := 'app_provider';
    END IF;

    UPDATE api.user
      SET role = _new_role
    WHERE id = _user.id;

    RETURN NEW;
  END;
$fn_block$;

REVOKE ALL PRIVILEGES ON FUNCTION util.update_role_on_subscription() FROM PUBLIC;

COMMIT;
