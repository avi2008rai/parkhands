BEGIN;

  SELECT plan(8);

  SELECT schema_privs_are(
    'api'
    , 'base_single'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'base_provider'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'base_super'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'app_anonymous'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'app_single_member'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'app_provider'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'app_provider_premium'
    , ARRAY['USAGE']
  );

  SELECT schema_privs_are(
    'api'
    , 'app_super_admin'
    , ARRAY['USAGE']
  );

  SELECT finish();

ROLLBACK;
