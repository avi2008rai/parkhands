BEGIN;

SELECT    plan(3);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'restrict_role_change'::NAME);
  SELECT function_lang_is('restrict_role_change', 'plpgsql');
  SELECT function_returns('restrict_role_change', 'trigger');

  SELECT    finish();

ROLLBACK;
