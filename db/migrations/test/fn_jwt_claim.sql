BEGIN;

SELECT	  plan(4);

  SET search_path TO request, PUBLIC;

  SELECT has_function('request', 'jwt_claim', ARRAY['text']);
  SELECT function_lang_is('jwt_claim', 'sql');
  SELECT function_returns('jwt_claim', 'text');

  SELECT lives_ok(
    $$SELECT request.jwt_claim('claim_name')$$
  );

SELECT	  finish();

ROLLBACK;
