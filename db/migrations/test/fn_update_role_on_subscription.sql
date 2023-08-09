BEGIN;

  SELECT plan(4);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'update_role_on_subscription'::NAME);
  SELECT function_lang_is('update_role_on_subscription', 'plpgsql');
  SELECT function_returns('update_role_on_subscription', 'trigger');
  SELECT function_privs_are('update_role_on_subscription', ARRAY[''], 'public', '{}');

  SELECT finish();

ROLLBACK;
