BEGIN;

SELECT	  plan(1);

SELECT has_schema('cron');

SELECT	  finish();

ROLLBACK;
