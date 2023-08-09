-- Verify PH:table_currency on pg

BEGIN;

SELECT
  id
  , code
  , name
  , status
  FROM api.currency
  WHERE FALSE;

ROLLBACK;
