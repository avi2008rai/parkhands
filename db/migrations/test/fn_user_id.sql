BEGIN;

SELECT	  plan(4);

  SET search_path TO request, PUBLIC;

  SELECT has_function('request', 'user_id'::NAME);
  SELECT function_lang_is('user_id', 'sql');
  SELECT function_returns('user_id', 'uuid');

  SELECT lives_ok(
    $$SELECT request.user_id()$$
  );

SELECT	  finish();

ROLLBACK;
