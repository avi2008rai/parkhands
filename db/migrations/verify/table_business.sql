-- Verify PH:table_business on pg

BEGIN;

  SELECT
    id
    , owner_id
    , name
    , description
    , photo_url
    , marker_url
    , address
    , location
    , slug
    , created_at
    , updated_at
  FROM api.business
    WHERE FALSE;

  SELECT 2/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_business_generate_slug_on_name'
      , 'trg_business_set_updated_at'
    );

ROLLBACK;
