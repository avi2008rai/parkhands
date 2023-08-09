
BEGIN;

  SELECT plan(3);

  SET search_path TO PUBLIC;

  SELECT has_function('public', 'round_time_5min', ARRAY['timestamp with time zone']);
  SELECT function_lang_is('round_time_5min', 'sql');
  SELECT function_returns('round_time_5min', 'timestamp with time zone');

  SELECT finish();

ROLLBACK;
