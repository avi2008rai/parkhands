BEGIN;

  SELECT * FROM plan(1);

  SELECT extensions_are(
    'public',
    ARRAY[
      'btree_gist'
      , 'citext'
      , 'pgcrypto'
      , 'pgtap'
      , 'pg_cron'
      , 'pg_hashids'
      , 'pg_stat_statements'
      , 'pgjwt'
      , 'postgis'
      , 'timescaledb'
      , 'uuid-ossp'
      , 'unaccent'
      ]);

  SELECT * FROM finish();

ROLLBACK;
