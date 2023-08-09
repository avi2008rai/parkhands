BEGIN;

  SELECT plan(8);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'slugify', ARRAY['text']);
  SELECT function_lang_is('slugify', 'sql');
  SELECT function_returns('slugify', 'text');

  SELECT lives_ok(
    $$SELECT settings.GET('unit.test')$$
  );

  SELECT results_eq(
    $$ SELECT * from util.slugify('1 moose sta`yed @ road') $$,
    $$ VALUES ('1-moose-sta-yed-road') $$
  );

  SELECT results_eq(
    $$ SELECT * from util.slugify('a@@``a') $$,
    $$ VALUES ('a-a') $$
  );

    SELECT results_eq(
    $$ SELECT * from util.slugify('a@@B``a') $$,
    $$ VALUES ('a-b-a') $$
  );

  SELECT results_eq(
    $$ SELECT * from util.slugify('School at the end of the road') $$,
    $$ VALUES ('school-at-the-end-of-the-road') $$
  );

  SELECT finish();

ROLLBACK;
