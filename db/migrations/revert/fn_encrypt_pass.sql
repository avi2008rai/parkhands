-- Revert PH:fn_encrypt_pass to pg

BEGIN;

  DROP FUNCTION auth.encrypt_pass();

COMMIT;
