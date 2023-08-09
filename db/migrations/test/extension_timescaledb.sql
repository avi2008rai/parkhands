BEGIN;

SELECT	  plan(1);

SELECT has_extension('timescaledb');

SELECT	  finish();

ROLLBACK;
