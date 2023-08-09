BEGIN;

SELECT	  plan(5);

SET search_path TO settings, PUBLIC;

SELECT has_function('settings', 'set', ARRAY['text', 'text']);
SELECT function_lang_is('set', 'sql');
SELECT function_returns('set', 'void');

PREPARE set_key_value AS
SELECT settings.SET('unit.test', 'pgTap');

SELECT lives_ok('EXECUTE set_key_value');

SELECT results_eq(
        $$ SELECT * FROM settings.secrets WHERE key = 'unit.test' $$,
        $$VALUES('unit.test'::TEXT, 'pgTap'::TEXT)$$
        );

SELECT	  finish();

ROLLBACK;
