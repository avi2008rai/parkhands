BEGIN;

SELECT	  plan(1);

SELECT has_schema('api');

SELECT	  finish();

ROLLBACK;
