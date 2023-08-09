-- Deploy PH:trg_user_set_updated_at to pg
-- requires: table_user
-- requires: fn_set_updated_at

BEGIN;

CREATE TRIGGER trg_user_set_updated_at
  BEFORE UPDATE
  ON api.user
  FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

COMMIT;
