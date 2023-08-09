BEGIN;

SELECT	  plan(1);

SELECT has_extension('pg_stat_statements');

SELECT	  finish();

ROLLBACK;
