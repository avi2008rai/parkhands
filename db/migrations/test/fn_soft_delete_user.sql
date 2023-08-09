BEGIN;

SELECT	  plan(3);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'soft_delete_user'::NAME);
  SELECT function_lang_is('soft_delete_user', 'plpgsql');
  SELECT function_returns('soft_delete_user', 'trigger');

SELECT	  finish();

ROLLBACK;
