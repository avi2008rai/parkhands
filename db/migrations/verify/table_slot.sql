-- Verify PH:table_slot on pg

BEGIN;

  SELECT
    id
    , name
    , owner_id
    , parking_space_id
    , address
    , timezone
    , price_per_hour
    , status
    , verification_status
    , photo_url
    , description
    , notes
    , location
    , slug
    , created_at
    , updated_at
    , deleted_at
    , deleted
    , shape
    , access_restrictions
    , contributor_id
    , category
    , business_status
    , business_status_reason
    , level
    , slot_dimensions
    , temp_unavailable
    , temp_unavailable_from
    , temp_unavailable_to
    , map_source
    , waypoints
  FROM api.slot
    WHERE FALSE;

  SELECT 3/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_slot_generate_slug_on_name'
      , 'trg_slot_set_updated_at'
      , 'trg_slot_soft_delete_record'
    );

ROLLBACK;
