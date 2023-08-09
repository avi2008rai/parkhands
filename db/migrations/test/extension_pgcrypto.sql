BEGIN;

SELECT	  plan(1);

SELECT has_extension('pgcrypto');

SELECT	  finish();

ROLLBACK;
