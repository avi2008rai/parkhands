-- Verify PH:table_vehicle_size on pg

BEGIN;

  SELECT
    id
    , name
    , status
    , weight
    , description
    , created_at
    , updated_at
  FROM api.vehicle_size
    WHERE FALSE;

  SELECT 1/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_vehicle_size_set_updated_at'
    );

ROLLBACK;
