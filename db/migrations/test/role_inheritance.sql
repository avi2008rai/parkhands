BEGIN;

SELECT plan(7);

  -- Base roles
  SELECT is_member_of('base_single', ARRAY[
    'base_provider'
    , 'app_single_member'
  ]);

  SELECT is_member_of('base_provider', ARRAY[
    'base_super'
    , 'app_provider'
  ]);

  SELECT is_member_of('base_super', ARRAY[
    'app_super_admin'
  ]);

  -- Single roles
  SELECT is_member_of('app_single_member', ARRAY[
    'authenticator'
    , 'app_provider'
  ]);

  -- Provider roles
  SELECT is_member_of('app_provider', ARRAY[
    'authenticator'
    , 'app_provider_premium'
  ]);

  SELECT is_member_of('app_provider_premium', ARRAY[
    'authenticator'
    , 'app_super_admin'
  ]);

  -- Admin roles
  SELECT is_member_of('app_super_admin', ARRAY[
    'authenticator'
  ]);

SELECT finish();

ROLLBACK;
