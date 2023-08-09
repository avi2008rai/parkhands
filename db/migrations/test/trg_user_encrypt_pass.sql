BEGIN;

  SELECT plan(1);

  SELECT trigger_is(
    'private',
    'user',
    'trg_user_encrypt_pass',
    'auth', 'encrypt_pass'
  );

  SELECT finish();

ROLLBACK;
