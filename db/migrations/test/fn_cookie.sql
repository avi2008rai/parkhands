BEGIN;

SELECT	  plan(4);

  SET search_path TO request, PUBLIC;

  SELECT has_function('request', 'cookie', ARRAY['text']);
  SELECT function_lang_is('cookie', 'sql');
  SELECT function_returns('cookie', 'text');

  SELECT lives_ok(
    $$SELECT request.cookie('cookie_info')$$
  );

SELECT	  finish();

ROLLBACK;
