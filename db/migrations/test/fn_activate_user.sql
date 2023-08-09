BEGIN;

  SELECT plan(4);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'activate_user', ARRAY['activate_user_input']);
  SELECT function_lang_is('activate_user', 'plpgsql');
  SELECT function_returns('activate_user', 'jwt_token');
  SELECT function_privs_are('activate_user', ARRAY['activate_user_input'], 'public', '{}');

  SELECT finish();

ROLLBACK;
