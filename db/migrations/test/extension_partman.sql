BEGIN;

SELECT	  plan(1);

SELECT has_extension('pg_partman');

SELECT	  finish();

ROLLBACK;
