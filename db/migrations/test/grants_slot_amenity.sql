BEGIN;

  SELECT plan(3);

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_amenity'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_amenity'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'DELETE']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_amenity'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'DELETE']
  );

  SELECT finish();

ROLLBACK;
