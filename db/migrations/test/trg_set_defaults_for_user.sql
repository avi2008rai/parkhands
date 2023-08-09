BEGIN;

  SELECT plan(1);

  SELECT trigger_is(
    'api',
    'user',
    'trg_set_defaults_for_user',
    'util', 'set_defaults_for_user'
  );

  SELECT finish();

ROLLBACK;
