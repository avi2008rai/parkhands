BEGIN;

  SELECT plan(21);

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  -- column privileges
  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'id'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'id'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );


  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'slot_id'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'slot_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'slot_id'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );


  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'day_of_week'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'day_of_week'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'day_of_week'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );


  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'start_hour'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'start_hour'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'start_hour'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );


  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'end_hour'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'end_hour'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'end_hour'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );


  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'created_at'::NAME
    , 'app_anonymous'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'created_at'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME
    , 'slot_availability'::NAME
    , 'created_at'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT finish();

ROLLBACK;
