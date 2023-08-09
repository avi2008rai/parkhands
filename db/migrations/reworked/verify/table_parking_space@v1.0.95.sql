-- Verify PH:table_parking_space on pg

BEGIN;

  SELECT
    id
    , owner_id
    , name
    , description
    , photo_url
    , settings
    , address
    , location
    , slug
    , created_at
    , updated_at
  FROM api.parking_space
    WHERE FALSE;

  SELECT 2/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_parking_space_generate_slug_on_name'
      , 'trg_parking_space_set_updated_at'
    );

ROLLBACK;
