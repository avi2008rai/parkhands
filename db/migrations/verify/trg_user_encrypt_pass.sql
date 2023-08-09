-- Verify PH:trg_user_encrypt_pass on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_trigger
  WHERE tgname = 'trg_user_encrypt_pass';

ROLLBACK;
