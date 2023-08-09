BEGIN;

  SELECT	  plan(15);

  SET SEARCH_PATH TO private, public;

  SELECT has_table('user');
  SELECT has_pk('user');
  SELECT columns_are(
    'user',
    ARRAY[
      'id'
      , 'password'
      ]
  );

  SELECT has_column(        'user', 'id');
  SELECT col_type_is(       'user', 'id', 'uuid');
  SELECT col_hasnt_default( 'user', 'id');
  SELECT col_not_null(      'user', 'id');
  SELECT fk_ok(             'user', 'id', 'user', 'id');

  SELECT has_column(        'user', 'password');
  SELECT col_type_is(       'user', 'password', 'text');
  SELECT col_has_default(   'user', 'password');
  SELECT col_default_is(    'user', 'password', $$uuid_generate_v4()$$);
  SELECT col_not_null(      'user', 'password');

  SELECT triggers_are(
    'private',
    'user',
    ARRAY[
      'trg_user_encrypt_pass'
      ]);

  SELECT trigger_is('private', 'user', 'trg_user_encrypt_pass', 'auth', 'encrypt_pass');

  SELECT	  finish();

ROLLBACK;
