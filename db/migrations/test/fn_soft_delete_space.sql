BEGIN;

SELECT plan(3);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'soft_delete_space'::NAME);
  SELECT function_lang_is('soft_delete_space', 'plpgsql');
  SELECT function_returns('soft_delete_space', 'trigger');

SELECT finish();

ROLLBACK;
