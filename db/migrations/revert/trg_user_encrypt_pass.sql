-- Revert PH:trg_user_encrypt_pass from pg

BEGIN;

DROP TRIGGER trg_user_encrypt_pass ON private.user;

COMMIT;
