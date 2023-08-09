BEGIN;

SELECT	  plan(4);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'set_updated_at'::NAME);
  SELECT function_lang_is('set_updated_at', 'plpgsql');
  SELECT function_returns('set_updated_at', 'trigger');
  SELECT function_privs_are('set_updated_at', ARRAY[''], 'public', '{}');

SELECT	  finish();

ROLLBACK;
