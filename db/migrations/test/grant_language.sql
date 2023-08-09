BEGIN;

  SELECT plan(3);

  SELECT table_privs_are(
    'api'::NAME
    , 'language'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'language'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'language'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  SELECT finish();

ROLLBACK;
