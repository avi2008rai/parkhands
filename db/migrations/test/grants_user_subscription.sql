BEGIN;

  SET search_path TO PUBLIC, api;

  SELECT plan(8);

  -- table privs
  SELECT table_privs_are(
    'user_subscription'::NAME, 'app_anonymous'::NAME
    , '{}'
  );

  SELECT table_privs_are(
    'user_subscription'::NAME, 'app_single_member'::NAME
    , ARRAY['SELECT', 'DELETE']
  );

  -- SELECT table_privs_are(
  --   'user_subscription'::NAME
  --   , 'app_prvider'::NAME
  --   , ARRAY['SELECT', 'DELETE']
  -- );

  SELECT table_privs_are(
    'user_subscription'::NAME
    , 'app_super_admin'::NAME
    , ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  );

  -- column privs
  SELECT column_privs_are(
    'user_subscription'::NAME, 'id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  -- column privs
  SELECT column_privs_are(
    'user_subscription'::NAME, 'user_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'user_subscription'::NAME, 'billing_profile_id'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'user_subscription'::NAME, 'status'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  SELECT column_privs_are(
    'user_subscription'::NAME, 'ends_at'::NAME
    , 'app_single_member'::NAME
    , ARRAY['SELECT']
  );

  -- role provider
  -- SELECT column_privs_are(
  --   'user_subscription'::NAME, 'id'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT']
  -- );

  -- -- column privs
  -- SELECT column_privs_are(
  --   'user_subscription'::NAME, 'user_id'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT']
  -- );

  -- SELECT column_privs_are(
  --   'user_subscription'::NAME, 'billing_profile_id'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT']
  -- );

  -- SELECT column_privs_are(
  --   'user_subscription'::NAME, 'status'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT']
  -- );

  -- SELECT column_privs_are(
  --   'user_subscription'::NAME, 'ends_at'::NAME
  --   , 'app_provider'::NAME
  --   , ARRAY['SELECT']
  -- );

  SELECT finish();

ROLLBACK;
