BEGIN;

SELECT	  plan(4);

  SET search_path TO auth, PUBLIC;

  SELECT has_function('auth', 'sign_jwt', ARRAY['json']);
  SELECT function_lang_is('sign_jwt', 'sql');
  SELECT function_returns('sign_jwt', 'text');
  SELECT function_privs_are('sign_jwt', ARRAY['json'], 'public', '{}');

SELECT	  finish();

ROLLBACK;
