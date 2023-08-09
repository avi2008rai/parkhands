-- Revert PH:fn_soft_delete_space from pg
-- requires: table_parking_space
-- requires: schema_util

BEGIN;

CREATE OR REPLACE FUNCTION util.soft_delete_space() RETURNS TRIGGER AS
$trg_fn_block$
  BEGIN

    UPDATE api.slot
      SET deleted = TRUE
      , deleted_at = now()
      , status = 'disabled'::parking_space_status
    WHERE id = OLD.id;

    RETURN NULL;
  END;
$trg_fn_block$
LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
