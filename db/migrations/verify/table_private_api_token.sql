-- Verify PH:table_private_api_token on pg

BEGIN;

SELECT
  api_key_id
  , api_token
  , expire_at
  , created_at
  FROM private.api_token
  WHERE FALSE;


ROLLBACK;
