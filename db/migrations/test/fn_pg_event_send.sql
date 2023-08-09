BEGIN;

SELECT    plan(4);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'pg_event_send', ARRAY['text', 'json']);
  SELECT function_lang_is('pg_event_send', 'plpgsql');
  SELECT function_returns('pg_event_send', 'json');
  SELECT function_privs_are('pg_event_send', ARRAY['text', 'json'], 'public', '{}');

SELECT    finish();

ROLLBACK;
