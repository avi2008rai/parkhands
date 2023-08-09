-- Deploy PH:fn_restrict_role_change to pg

BEGIN;

  CREATE OR REPLACE FUNCTION util.restrict_role_change()
    RETURNS TRIGGER AS
  $$
    DECLARE
      allowed_roles  NAME[];
      user_role      TEXT DEFAULT request.user_role();
    BEGIN

      SELECT INTO allowed_roles
        array_agg(ID)
        FROM api.user_roles AS pr
      WHERE (
        SELECT pg_catalog.pg_has_role(
          user_role
          , pr.ID
          , 'MEMBER'
        )
      );

      IF (NEW.ROLE::NAME <> ALL(allowed_roles)) THEN
        RAISE EXCEPTION USING ERRCODE = 'RO011'
        , DETAIL = 'Apply role: `' || NEW.ROLE || '` is prohibited!';
      END IF;

      RETURN NEW;

    END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
