-- Verify PH:grant_user_roles on pg

DO $$
BEGIN

  ASSERT (SELECT has_table_privilege('base_single'
    , 'api.user_roles', 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.user_roles', 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.user_roles', 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege('base_single'
    , 'api.user_roles', 'DELETE'));

END $$;
