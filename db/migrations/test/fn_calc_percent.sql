BEGIN;

SELECT	  plan(5);

SELECT has_function('public', 'calc_percent', ARRAY['integer', 'integer']);
SELECT function_lang_is('calc_percent', 'sql');
SELECT function_returns('calc_percent', 'double precision');

SELECT lives_ok(
        $$SELECT calc_percent(2, 3)$$
        );

SELECT results_eq(
        $$SELECT calc_percent(2, 3)$$,
        $$SELECT round(2 * 100 / 3)$$
        );

SELECT	  finish();

ROLLBACK;
