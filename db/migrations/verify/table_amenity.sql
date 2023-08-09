-- Verify PH:table_amenity on pg

BEGIN;

  SELECT
    id
    , name
    , weight
    , description
    , status
    , slug
    , created_at
    , updated_at
  FROM api.amenity
    WHERE FALSE;

  SELECT 2/COUNT(*) FROM pg_trigger
  WHERE tgname IN (
    'trg_amenity_set_updated_at'
    , 'trg_amenity_generate_slug_on_name'
  );

ROLLBACK;
