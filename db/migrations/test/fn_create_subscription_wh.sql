BEGIN;

  SELECT plan(4);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'create_subscription_wh'::NAME);
  SELECT function_lang_is('create_subscription_wh', 'plpgsql');
  SELECT function_returns('create_subscription_wh', 'trigger');
  SELECT function_privs_are('create_subscription_wh', ARRAY[''], 'public', '{}');

  SELECT finish();

ROLLBACK;
