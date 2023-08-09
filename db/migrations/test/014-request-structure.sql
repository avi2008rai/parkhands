BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are('request'::NAME, '{}');

  SELECT functions_are('request',
                       ARRAY[
                         'cookie'
                         , 'env_var'
                         , 'header'
                         , 'jwt_claim'
                         , 'user_id'
                         , 'user_role'
                         ]);

  SELECT types_are('request'::NAME, '{}');

  SELECT domains_are('request'::NAME, '{}');

  SELECT views_are('request'::NAME, '{}');

  SELECT tables_are('request'::NAME, '{}');

  SELECT * FROM finish();

ROLLBACK;
