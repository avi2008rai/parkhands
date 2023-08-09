BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are('settings'::NAME, '{}');

  SELECT functions_are('settings',
                       ARRAY[
                         'get'
                         , 'set'
                         ]);

  SELECT types_are('settings'::NAME, '{}');

  SELECT domains_are('settings'::NAME, '{}');

  SELECT views_are('settings'::NAME, '{}');

  SELECT tables_are('settings'::NAME,
                    ARRAY[
                      'secrets'
                      ]);

  SELECT * FROM finish();

ROLLBACK;
