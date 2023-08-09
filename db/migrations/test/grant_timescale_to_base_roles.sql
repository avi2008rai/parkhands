BEGIN;

  SELECT plan(3);

  SELECT schema_privs_are(
    'timescale'
    , 'app_anonymous'
    , '{}'
    );

  SELECT schema_privs_are(
    'timescale'
    , 'app_single_member'
    , ARRAY['USAGE']
    );

  SELECT schema_privs_are(
    'timescale'
    , 'app_super_admin'
    , ARRAY['USAGE']
    );

  SELECT finish();

ROLLBACK;
