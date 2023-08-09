BEGIN;


  SELECT plan(4);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'me'::NAME);
  SELECT function_lang_is('me', 'plpgsql');
  SELECT function_returns('me', 'json');
  SELECT function_privs_are('me', ARRAY[''], 'public', '{}');

  SELECT finish();

ROLLBACK;
