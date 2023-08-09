BEGIN;

SELECT plan(3);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'soft_delete_slot'::NAME);
  SELECT function_lang_is('soft_delete_slot', 'plpgsql');
  SELECT function_returns('soft_delete_slot', 'trigger');

SELECT finish();

ROLLBACK;
