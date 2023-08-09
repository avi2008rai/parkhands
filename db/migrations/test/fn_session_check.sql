BEGIN;

  SELECT plan(10);

  SELECT has_function('public', 'session_check', '');
  SELECT function_lang_is('session_check', 'plpgsql');
  SELECT function_returns('session_check', 'void');
  -- privs
  SELECT function_privs_are('session_check', ARRAY[''], 'public', '{EXECUTE}');
  SELECT function_privs_are('session_check', ARRAY[''], 'app_anonymous', '{EXECUTE}');
  SELECT function_privs_are('session_check', ARRAY[''], 'app_single_member', '{EXECUTE}');
  SELECT function_privs_are('session_check', ARRAY[''], 'app_super_admin', '{EXECUTE}');

  -- no user_id provided / bad session
  SET jwt.claims.id = '';

  SELECT throws_ok(
    $$ SELECT public.session_check() $$
    , 'US400'
    , NULL
    , 'Session is wrong!'
  );

  -- single member
  SET jwt.claims.id = 'e4535745-ff95-4af4-bad1-9d649d506d2f';

  SELECT lives_ok(
    $$ SELECT public.session_check() $$
    , 'Continues on as its called inside a function'
  );

   -- super member
  SET jwt.claims.id = 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09';

  SELECT lives_ok(
    $$ SELECT public.session_check() $$
    , 'Continues on as its called inside a function'
  );

  SELECT finish();

ROLLBACK;
