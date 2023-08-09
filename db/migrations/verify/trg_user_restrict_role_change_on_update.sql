-- Verify PH:trg_user_restrict_role_change_on_update on pg

BEGIN;

SELECT 1/COUNT(*)
  FROM pg_trigger
  WHERE tgname = 'trg_user_restrict_role_change_on_update';

ROLLBACK;
