-- Verify PH:grant_vehicle_type on pg

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege('app_anonymous'
    , 'api.vehicle_type', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.vehicle_type', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.vehicle_type', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.vehicle_type', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.vehicle_type', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.vehicle_type', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.vehicle_type', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.vehicle_type', 'DELETE'));

    ASSERT (SELECT has_table_privilege('base_super'
      , 'api.vehicle_type', 'SELECT'));
    ASSERT (SELECT has_table_privilege('base_super'
      , 'api.vehicle_type', 'INSERT'));
    ASSERT (SELECT has_table_privilege('base_super'
      , 'api.vehicle_type', 'UPDATE'));
    ASSERT (SELECT has_table_privilege('base_super'
      , 'api.vehicle_type', 'DELETE'));

END $$;
