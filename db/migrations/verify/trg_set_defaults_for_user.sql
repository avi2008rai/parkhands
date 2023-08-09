-- Verify PH:trg_set_defaults_for_user on pg

BEGIN;

  SELECT 1/COUNT(*)
    FROM pg_trigger
    WHERE tgname = 'trg_set_defaults_for_user';

ROLLBACK;
