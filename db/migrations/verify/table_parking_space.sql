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
    , car_entry
    , car_exit
    , company_entrance
    , parkingspace_mapview
    , brand_logo
    , working_hours
    , advt_link
    , blue_print
    , hidden_field
    , pedestrian_text
    , language_code
    , contributor_id
    , floor
    , category
    , status
    , verification_status
    , access_restriction
    , deleted_at
    , deleted
    , business_status_reason
  FROM api.parking_space
    WHERE FALSE;

  SELECT 2/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_parking_space_generate_slug_on_name'
      , 'trg_parking_space_set_updated_at'
      , 'trg_space_soft_delete_record'
    );

ROLLBACK;
