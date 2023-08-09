-- Verify PH:data_user on pg

BEGIN;

SELECT 1/( 2 = COUNT(*) )::INTEGER
  FROM api.user;

ROLLBACK;
