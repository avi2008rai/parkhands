BEGIN;

SELECT	  plan(1);

SELECT has_domain('public', 'progress_t'::NAME);

SELECT	  finish();

ROLLBACK;
