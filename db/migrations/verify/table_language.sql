-- Verify PH:table_language on pg

BEGIN;

SELECT
  code
  , name
  , weight
  FROM api.language
       WHERE FALSE;

ROLLBACK;
