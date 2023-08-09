-- Verify PH:table_private_api_key on pg

BEGIN;

SELECT
  id
  , user_id
  , api_key
  , description
  , expire_at
  , created_at
  FROM private.api_key
  WHERE FALSE;


ROLLBACK;
