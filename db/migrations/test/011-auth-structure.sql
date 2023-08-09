BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are('auth'::NAME, '{}');

  SELECT functions_are('auth'::NAME,
                       ARRAY[
                         'encrypt_pass'
                         , 'encrypt_api_key'
                         , 'sign_jwt'
                         ]);

  SELECT types_are('auth'::NAME, '{}');

  SELECT domains_are('auth'::NAME, '{}');

  SELECT views_are('auth'::NAME, '{}');

  SELECT tables_are('auth'::NAME, '{}');

  SELECT * FROM finish();

ROLLBACK;
