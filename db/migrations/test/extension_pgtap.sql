BEGIN;

SELECT    plan(1);

SELECT has_extension('pgtap');

SELECT    finish();

ROLLBACK;
