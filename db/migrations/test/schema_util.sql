BEGIN;

SELECT	  plan(1);

SELECT has_schema('util');

SELECT	  finish();

ROLLBACK;
