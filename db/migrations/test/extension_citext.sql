BEGIN;

SELECT	  plan(1);

SELECT has_extension('citext');

SELECT	  finish();

ROLLBACK;
