BEGIN;

SELECT    plan(1);

SELECT has_extension('pgjwt');

SELECT    finish();

ROLLBACK;
