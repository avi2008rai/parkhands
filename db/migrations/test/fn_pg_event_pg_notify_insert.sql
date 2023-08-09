BEGIN;

  SELECT plan(3);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'pg_event_pg_notify_insert'::NAME);
  SELECT function_lang_is('pg_event_pg_notify_insert', 'plpgsql');
  SELECT function_returns('pg_event_pg_notify_insert', 'trigger');

  SELECT finish();

ROLLBACK;
