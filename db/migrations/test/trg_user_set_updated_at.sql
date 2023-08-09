BEGIN;

  SELECT plan(1);

  SELECT trigger_is(
    'api',
    'user',
    'trg_user_set_updated_at',
    'util', 'set_updated_at'
  );

  SELECT finish();

ROLLBACK;
