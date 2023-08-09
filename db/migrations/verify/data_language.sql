-- Verify PH:data_language on pg

BEGIN;

SELECT 1/( 2 = COUNT(*) )::INTEGER
  FROM api.language;

ROLLBACK;
