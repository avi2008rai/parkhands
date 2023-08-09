BEGIN;


  SELECT    plan(4);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'refresh_token'::NAME);
  SELECT function_lang_is('refresh_token', 'plpgsql');
  SELECT function_returns('refresh_token', 'jwt_token');
  SELECT function_privs_are('refresh_token', ARRAY[''], 'public', '{}');

  SELECT finish();

ROLLBACK;
