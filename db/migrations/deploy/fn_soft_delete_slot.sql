-- Deploy PH:fn_soft_delete_slot to pg
-- requires: table_slot
-- requires: schema_util

BEGIN;

CREATE OR REPLACE FUNCTION util.soft_delete_slot() RETURNS TRIGGER AS
$trg_fn_block$
  BEGIN

    UPDATE api.slot
      SET deleted = TRUE
      , deleted_at = now()
      , status = CASE
        WHEN request.user_role() = 'app_single_member' THEN 'unlisted'::slot_status_t
        ELSE 'deleted'::slot_status_t
      END
    WHERE id = OLD.id;

    RETURN NULL;
  END;
$trg_fn_block$
LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
