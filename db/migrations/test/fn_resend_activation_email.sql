BEGIN;

  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'resend_activation_email', ARRAY['email']);
  SELECT function_lang_is('resend_activation_email', 'plpgsql');
  SELECT function_returns('resend_activation_email', 'boolean');

  SELECT function_privs_are(
    'resend_activation_email'
    , ARRAY['email']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'resend_activation_email'
    , ARRAY['email']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'resend_activation_email'
    , ARRAY['email']
    , 'app_single_member'
    , '{}'
  );

  SELECT function_privs_are(
    'resend_activation_email'
    , ARRAY['email']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;
