BEGIN;
  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'email_available', ARRAY['email']);
  SELECT function_lang_is('email_available', 'plpgsql');
  SELECT function_returns('email_available', 'boolean');

  SELECT function_privs_are(
    'email_available'
    , ARRAY['email']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'email_available'
    , ARRAY['email']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'email_available'
    , ARRAY['email']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'email_available'
    , ARRAY['email']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();
ROLLBACK;
