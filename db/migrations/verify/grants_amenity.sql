-- Verify PH:grants_amenity on pg

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege('app_anonymous'
    , 'api.amenity', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.amenity', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.amenity', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.amenity', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.amenity', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.amenity', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.amenity', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.amenity', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.amenity', 'SELECT'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.amenity', 'INSERT'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.amenity', 'UPDATE'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.amenity', 'DELETE'));

END $$;
