BEGIN;

  SELECT plan(3);

  SELECT table_privs_are(
    'api'::NAME
    , 'slot'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  SELECT finish();

ROLLBACK;
