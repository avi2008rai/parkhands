BEGIN;

  SELECT plan(3);

  SELECT table_privs_are(
    'api'::NAME
    , 'vehicle_size'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'vehicle_size'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'vehicle_size'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  SELECT finish();

ROLLBACK;
