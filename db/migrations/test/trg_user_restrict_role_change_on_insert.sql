BEGIN;

  SELECT plan(1);

  SELECT trigger_is(
    'api',
    'user',
    'trg_user_restrict_role_change_on_insert',
    'util', 'restrict_role_change'
  );

  SELECT finish();

ROLLBACK;
