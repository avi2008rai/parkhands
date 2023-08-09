-- Verify PH:table_amenity on pg

BEGIN;

  SELECT
    id
    , name
    , weight
    , description
    , status
    , created_at
    , updated_at
  FROM api.amenity
    WHERE FALSE;

  SELECT 1/COUNT(*) FROM pg_trigger
  WHERE tgname = 'trg_amenity_set_updated_at';

ROLLBACK;
