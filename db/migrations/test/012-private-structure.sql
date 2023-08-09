BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are('private'::NAME, '{}');

  SELECT functions_are('private'::NAME, '{}');

  SELECT types_are('private'::NAME, '{}');

  SELECT domains_are('private'::NAME, '{}');

  SELECT views_are('private'::NAME, '{}');

  SELECT tables_are('private'::NAME,
    ARRAY[
      'pg_event'
      , 'user'
      , 'api_key'
      , 'api_token'
      , 'api_usage'
      , 'stripe_webhook'
    ]);

  SELECT finish();

ROLLBACK;
