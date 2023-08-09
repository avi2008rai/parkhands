-- Verify PH:trg_user_set_updated_at on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_trigger
  WHERE tgname = 'trg_user_set_updated_at';

ROLLBACK;
