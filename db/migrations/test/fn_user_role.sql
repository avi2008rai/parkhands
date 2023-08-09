BEGIN;

SELECT	  plan(4);

  SET search_path TO request, PUBLIC;

  SELECT has_function('request', 'user_role'::NAME);
  SELECT function_lang_is('user_role', 'sql');
  SELECT function_returns('user_role', 'text');

  SELECT lives_ok(
    $$SELECT request.user_role()$$
  );

SELECT	  finish();

ROLLBACK;
