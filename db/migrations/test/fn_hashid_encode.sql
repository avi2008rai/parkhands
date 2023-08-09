BEGIN;

SELECT plan(7);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'hashid_encode', ARRAY['bigint','int']);
  SELECT function_lang_is('hashid_encode', 'plpgsql');
  SELECT function_returns('hashid_encode', 'text');
  SELECT function_privs_are('hashid_encode', ARRAY['bigint','int'], 'public', '{EXECUTE}');

  SELECT results_eq(
    $$ SELECT hashid_encode(1,3) $$,
    $$ VALUES('4wm') $$,
    'length = 3'
  );

  SELECT results_eq(
    $$ SELECT hashid_encode(1) $$,
    $$ VALUES('p4wmZa') $$,
    'No length param passed'
  );

  SELECT results_eq(
    $$ SELECT hashid_encode(100,6) $$,
    $$ VALUES('mB33YB') $$,
    'length = 6'
  );

SELECT finish();

ROLLBACK;
