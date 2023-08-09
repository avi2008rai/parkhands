-- Verify PH:grant_language on pg

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege('app_anonymous'
    , 'api.language', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.language', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.language', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('app_anonymous'
    , 'api.language', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.language', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.language', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.language', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.language', 'DELETE'));

  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.language', 'SELECT'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.language', 'INSERT'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.language', 'UPDATE'));
  ASSERT (SELECT has_table_privilege('base_super'
    , 'api.language', 'DELETE'));

END $$;
