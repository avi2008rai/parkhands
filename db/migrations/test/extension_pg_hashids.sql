BEGIN;

SELECT	  plan(1);

SELECT has_extension('pg_hashids');

SELECT	  finish();

ROLLBACK;
