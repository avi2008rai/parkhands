BEGIN;

SELECT	  plan(1);

SELECT has_schema('timescale');

SELECT	  finish();

ROLLBACK;
