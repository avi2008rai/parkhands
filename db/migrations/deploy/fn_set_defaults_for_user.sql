-- Deploy PH:fn_set_defaults_for_user to pg
-- requires: schema_util

BEGIN;

  CREATE FUNCTION util.set_defaults_for_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
  AS $fn$
    BEGIN

      INSERT INTO api.billing_profile (
        user_id
      ) VALUES (
        NEW.id
      );

      INSERT INTO private.user(
        id
        , password
      ) VALUES (
        NEW.id
        , uuid_generate_v4()
      );

      RETURN NEW;
    END;
  $fn$;

  REVOKE ALL PRIVILEGES ON FUNCTION util.set_defaults_for_user() FROM PUBLIC;

COMMIT;
