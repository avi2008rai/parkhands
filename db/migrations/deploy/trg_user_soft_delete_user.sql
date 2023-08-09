-- Deploy PH:trg_user_soft_delete_user to pg
-- requires: table_user
-- requires: fn_soft_delete_user

BEGIN;

CREATE TRIGGER trg_user_soft_delete_user
  BEFORE DELETE
  ON api.user
  FOR EACH ROW EXECUTE PROCEDURE util.soft_delete_user();

COMMENT ON TRIGGER trg_user_soft_delete_user ON api.user IS 'soft deletes record based on the deleted and deleted_at columns';

COMMIT;
