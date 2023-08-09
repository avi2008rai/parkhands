BEGIN;

  SELECT plan(4);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'update_user', ARRAY['api.update_user_input']);
  SELECT function_lang_is('update_user', 'plpgsql');
  SELECT function_returns('update_user', '"user"');
  SELECT function_privs_are('update_user', ARRAY['api.update_user_input'], 'public', '{}');

  SELECT finish();

ROLLBACK;
