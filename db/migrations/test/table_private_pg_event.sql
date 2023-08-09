BEGIN;

  SELECT	  plan(23);

  SET SEARCH_PATH TO private, PUBLIC;

  SELECT has_table('pg_event');
  SELECT has_pk('pg_event');
  SELECT columns_are(
    'pg_event',
    ARRAY[
      'id'
      , 'event_key'
      , 'payload'
      , 'created_at'
      ]);

  SELECT has_column(        'pg_event', 'id');
  SELECT col_type_is(       'pg_event', 'id', 'uuid');
  SELECT col_has_default(   'pg_event', 'id');
  SELECT col_default_is(    'pg_event', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'pg_event', 'id');
  SELECT col_is_pk(         'pg_event', 'id');

  SELECT has_column(        'pg_event', 'event_key');
  SELECT col_type_is(       'pg_event', 'event_key', 'text');
  SELECT col_not_null(      'pg_event', 'event_key');
  SELECT col_hasnt_default( 'pg_event', 'event_key');

  SELECT has_column(        'pg_event', 'payload');
  SELECT col_type_is(       'pg_event', 'payload', 'jsonb');
  SELECT col_is_null(       'pg_event', 'payload');
  SELECT col_hasnt_default( 'pg_event', 'payload');

  SELECT has_column(        'pg_event', 'created_at');
  SELECT col_type_is(       'pg_event', 'created_at', 'timestamp with time zone');
  SELECT col_default_is(    'pg_event', 'created_at', 'now()');
  SELECT col_not_null(      'pg_event', 'created_at');

  SELECT indexes_are(
    'pg_event',
    ARRAY[
      'pg_event_pkey'
      ]);

  SELECT has_index('pg_event', 'pg_event_pkey'::NAME, ARRAY['id']);

  SELECT	  finish();

ROLLBACK;
