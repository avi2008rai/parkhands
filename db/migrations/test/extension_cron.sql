BEGIN;

SELECT	  plan(1);

SELECT has_extension('pg_cron');

SELECT	  finish();

ROLLBACK;
