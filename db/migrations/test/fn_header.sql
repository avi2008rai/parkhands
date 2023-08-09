BEGIN;

  SELECT	  plan(4);

  SET search_path TO request, PUBLIC;

  SELECT has_function('request', 'header', ARRAY['text']);
  SELECT function_lang_is('header', 'sql');
  SELECT function_returns('header', 'text');

  SELECT lives_ok(
    $$SELECT request.header('header_info')$$
  );

SELECT	  finish();

ROLLBACK;
