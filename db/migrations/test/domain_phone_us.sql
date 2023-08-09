BEGIN;

SELECT	  plan(1);

SELECT has_domain('public', 'phone_us'::NAME);

SELECT	  finish();

ROLLBACK;
