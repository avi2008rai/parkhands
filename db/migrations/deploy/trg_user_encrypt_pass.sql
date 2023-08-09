-- Deploy PH:trg_user_encrypt_pass to pg

BEGIN;

CREATE TRIGGER trg_user_encrypt_pass
  BEFORE INSERT OR UPDATE
  ON private.user
  FOR EACH ROW EXECUTE PROCEDURE auth.encrypt_pass();

COMMIT;
