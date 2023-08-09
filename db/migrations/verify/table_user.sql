-- Verify PH:table_user on pg

BEGIN;

  SELECT
    id
    , name
    , email
    , email_confirmed
    , status
    , role
    , photo_url
    , phone
    , address
    , settings
    , created_at
    , updated_at
    , deleted
    , deleted_at
  FROM api.user
    WHERE FALSE;

ROLLBACK;
