BEGIN;

  SELECT * FROM plan(1);

  SELECT schemas_are(
    ARRAY[
      'api'
      , 'auth'
      , 'cron'
      , 'private'
      , 'partman'
      , 'public'
      , 'request'
      , 'settings'
      , 'sqitch'
      , 'timescale'
      , '_timescaledb_cache'
      , '_timescaledb_catalog'
      , '_timescaledb_config'
      , '_timescaledb_internal'
      , 'postgraphile_watch'
      , 'timescaledb_information'
      , 'util'
      ]);

  SELECT * FROM finish();

ROLLBACK;
