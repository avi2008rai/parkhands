-- Verify PH:data_country on pg

BEGIN;

SELECT 1/( 255 = COUNT(*) )::INTEGER
  FROM api.country;

ROLLBACK;
