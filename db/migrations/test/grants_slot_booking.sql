BEGIN;

  SELECT plan(11);

  SELECT table_privs_are(
    'timescale'::NAME
    , 'slot_booking'::NAME
    , 'app_anonymous'::NAME
    , '{}'
  );

  SELECT table_privs_are(
    'timescale'::NAME
    , 'slot_booking'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  SELECT table_privs_are(
    'timescale'::NAME
    , 'slot_booking'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  -- column privs
  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'slot_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'user_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'status'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'license_plate'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'start_time'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'end_time'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'phone'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT column_privs_are(
    'timescale'::NAME, 'slot_booking'::NAME
    , 'payment_receipt_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE']
  );

  SELECT finish();

ROLLBACK;
