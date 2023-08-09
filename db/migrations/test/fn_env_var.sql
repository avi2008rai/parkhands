BEGIN;

SELECT	  plan(6);

  SET search_path TO request, PUBLIC;

  SELECT has_function('request', 'env_var', ARRAY['text']);
  SELECT function_lang_is('env_var', 'sql');
  SELECT function_returns('env_var', 'text');

  SELECT lives_ok(
    $$SELECT request.env_var('server_version')$$
  );

  SELECT lives_ok(
    $$SELECT request.env_var('no_such_GUC')$$
  );

  SELECT results_eq(
    $$SELECT request.env_var('server_version')$$,
    $$SELECT current_setting('server_version')$$
    );

SELECT	  finish();

ROLLBACK;
