-- Verify PH:table_country on pg

BEGIN;

SELECT
  id
  , code
  , name
  , status
  FROM api.country
  WHERE FALSE;

ROLLBACK;
