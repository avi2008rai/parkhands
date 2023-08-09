-- Verify PH:trg_user_soft_delete_user on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_trigger
  WHERE tgname = 'trg_user_soft_delete_user';

ROLLBACK;
