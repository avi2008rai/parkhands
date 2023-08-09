-- Verify PH:grant_country on pg

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege('app_anonymous'
    , 'api.country', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.country', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.country', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.country', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.country', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.country', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.country', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.country', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.country', 'SELECT'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.country', 'INSERT'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.country', 'UPDATE'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.country', 'DELETE'));

END $$;
