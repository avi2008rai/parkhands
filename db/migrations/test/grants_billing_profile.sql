BEGIN;

  SET search_path TO PUBLIC, api;

  SELECT plan(7);

  -- table privs
  SELECT table_privs_are(
    'billing_profile'::NAME, 'app_anonymous'::NAME
    , '{}'
  );

  SELECT table_privs_are(
    'billing_profile'::NAME, 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  -- SELECT table_privs_are(
  --   'billing_profile'::NAME
  --   , 'app_prvider'::NAME
  --   , ARRAY['SELECT', 'DELETE']
  -- );

  SELECT table_privs_are(
    'billing_profile'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  -- column privs

  SELECT column_privs_are(
    'billing_profile'::NAME, 'id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  -- column privs
  SELECT column_privs_are(
    'billing_profile'::NAME, 'customer_obj'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'UPDATE']
  );

  SELECT column_privs_are(
    'billing_profile'::NAME, 'customer_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'UPDATE']
  );

  SELECT column_privs_are(
    'billing_profile'::NAME, 'billing_details'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT', 'UPDATE']
  );

  -- role provider

  -- SELECT column_privs_are(
  --   'billing_profile'::NAME
  --   , 'id'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT']
  -- );


  -- SELECT column_privs_are(
  --   'billing_profile'::NAME
  --   , 'payment_method_id'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT', 'INSERT', 'UPDATE']
  -- );

  -- SELECT column_privs_are(
  --   'billing_profile'::NAME
  --   , 'customer_id'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT', 'INSERT', 'UPDATE']
  -- );

  -- SELECT column_privs_are(
  --   'billing_profile'::NAME
  --   , 'billing_details'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT', 'INSERT', 'UPDATE']
  -- );

  SELECT finish();

ROLLBACK;
