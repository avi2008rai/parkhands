BEGIN;

  SELECT plan(4);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'register', ARRAY['api.register_input']);
  SELECT function_lang_is('register', 'plpgsql');
  SELECT function_returns('register', 'jwt_token');
  SELECT function_privs_are('register', ARRAY['api.register_input'], 'public', '{}');

  SELECT finish();

ROLLBACK;
