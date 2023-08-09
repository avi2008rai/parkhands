-- Deploy PH:fn_soft_delete_space to pg
-- requires: table_parking_space
-- requires: schema_util

BEGIN;

CREATE OR REPLACE FUNCTION util.soft_delete_space() RETURNS TRIGGER AS
$trg_fn_block$
  BEGIN

    UPDATE api.parking_space
      SET deleted = TRUE
      , deleted_at = now()
      , status = CASE
        WHEN request.user_role() = 'app_single_member' THEN 'unlisted'::parking_space_status
        ELSE 'deleted'::parking_space_status
      END
    WHERE id = OLD.id;

    RETURN NULL;
  END;
$trg_fn_block$
LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
