BEGIN;

  SELECT plan(1);

  SELECT trigger_is(
    'private',
    'pg_event',
    'trg_pg_event_pg_notify_insert',
    'util', 'pg_event_pg_notify_insert'
  );

  SELECT finish();

ROLLBACK;
