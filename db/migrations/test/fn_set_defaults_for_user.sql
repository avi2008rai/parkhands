BEGIN;

  SELECT plan(4);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'set_defaults_for_user'::NAME);
  SELECT function_lang_is('set_defaults_for_user', 'plpgsql');
  SELECT function_returns('set_defaults_for_user', 'trigger');
  SELECT function_privs_are('set_defaults_for_user', ARRAY[''], 'public', '{}');

  SELECT finish();

ROLLBACK;
