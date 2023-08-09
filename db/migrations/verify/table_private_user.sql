-- Verify PH:table_private_user on pg

BEGIN;

SELECT
  ID
  , password
  FROM private.user
  WHERE FALSE;

ROLLBACK;
