BEGIN;

  SELECT plan(9);

  SELECT table_privs_are(
    'api'::NAME
    , 'vehicle'::NAME
    , 'app_anonymous'::NAME
    , '{}'
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'vehicle'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'vehicle'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  SELECT column_privs_are(
    'api'::NAME, 'vehicle'::NAME
    , 'name'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME, 'vehicle'::NAME
    , 'owner_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME, 'vehicle'::NAME
    , 'license_plate'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME, 'vehicle'::NAME
    , 'vehicle_type_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME, 'vehicle'::NAME
    , 'vehicle_size_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME, 'vehicle'::NAME
    , 'status'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT finish();

ROLLBACK;
