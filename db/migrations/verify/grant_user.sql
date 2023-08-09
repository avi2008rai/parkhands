-- Verify PH:grant_user on pg

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege('app_anonymous'
    , 'api.user', 'SELECT'));

  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.user', 'SELECT'));
  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.user', 'INSERT'));
  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.user', 'UPDATE'));
  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.user', 'DELETE'));

END $$;
