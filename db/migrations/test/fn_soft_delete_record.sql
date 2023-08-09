BEGIN;

SELECT	  plan(3);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'soft_delete_record'::NAME);
  SELECT function_lang_is('soft_delete_record', 'plpgsql');
  SELECT function_returns('soft_delete_record', 'trigger');

SELECT	  finish();

ROLLBACK;
