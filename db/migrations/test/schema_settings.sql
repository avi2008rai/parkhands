BEGIN;

SELECT	  plan(1);

SELECT has_schema('settings');

SELECT	  finish();

ROLLBACK;
