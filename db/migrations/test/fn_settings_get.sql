BEGIN;

SELECT	  plan(5);

SET search_path TO settings, PUBLIC;

SELECT has_function('settings', 'get', ARRAY['text']);
SELECT function_lang_is('get', 'sql');
SELECT function_returns('get', 'text');

INSERT INTO settings.secrets (KEY, VALUE) VALUES('unit.test', 'pgTap');

SELECT lives_ok(
        $$SELECT settings.GET('unit.test')$$
        );

SELECT results_eq(
        $$SELECT settings.GET('unit.test')$$,
        $$SELECT value FROM settings.secrets WHERE KEY='unit.test'$$
        );

SELECT	  finish();

ROLLBACK;
