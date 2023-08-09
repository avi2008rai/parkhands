BEGIN;

  SELECT plan(1);

  SELECT trigger_is(
    'api',
    'user',
    'trg_user_soft_delete_user',
    'util', 'soft_delete_user'
  );

  SELECT finish();

ROLLBACK;
