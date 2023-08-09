BEGIN;

SELECT	  plan(1);

SELECT has_schema('private');

SELECT	  finish();

ROLLBACK;
