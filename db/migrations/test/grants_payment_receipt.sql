BEGIN;

  SELECT plan(9);

  SELECT table_privs_are(
    'api'::NAME
    , 'payment_receipt'::NAME
    , 'app_anonymous'::NAME
    , '{}'
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'payment_receipt'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'payment_receipt'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'DELETE']
  );

  -- column privs
  SELECT column_privs_are(
    'api'::NAME, 'payment_receipt'::NAME
    , 'payment_intent_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT']
  );

  -- column privs
  SELECT column_privs_are(
    'api'::NAME, 'payment_receipt'::NAME
    , 'owner_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT']
  );

  SELECT column_privs_are(
    'api'::NAME, 'payment_receipt'::NAME
    , 'receipt_url'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT']
  );

  SELECT column_privs_are(
    'api'::NAME, 'payment_receipt'::NAME
    , 'amount'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'INSERT']
  );

  SELECT column_privs_are(
    'api'::NAME, 'payment_receipt'::NAME
    , 'created_at'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'api'::NAME, 'payment_receipt'::NAME
    , 'updated_at'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT finish();

ROLLBACK;
