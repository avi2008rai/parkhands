-- Verify PH:data_currency on pg

BEGIN;

SELECT 1/( 17 = COUNT(*) )::INTEGER
  FROM api.currency;

ROLLBACK;
