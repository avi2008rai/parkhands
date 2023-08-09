-- Deploy PH:fn_soft_delete_slot to pg
-- requires: table_slot
-- requires: schema_util

BEGIN;

CREATE FUNCTION util.soft_delete_slot() RETURNS TRIGGER AS
$trg_fn_block$
  BEGIN

    UPDATE api.slot
      SET deleted = TRUE
      , deleted_at = now()
      , status = 'disabled'::slot_status_t
    WHERE id = OLD.id;

    RETURN NULL;
  END;
$trg_fn_block$
LANGUAGE plpgsql security definer;

COMMIT;
