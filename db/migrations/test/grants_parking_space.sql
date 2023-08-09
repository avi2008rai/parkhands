BEGIN;

  SELECT plan(4);

  SELECT table_privs_are(
    'api'::NAME
    , 'parking_space'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'parking_space'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'parking_space'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'parking_space'::NAME
    , 'app_provider_premium'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  SELECT finish();

ROLLBACK;
