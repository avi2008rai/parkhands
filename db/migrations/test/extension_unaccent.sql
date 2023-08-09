BEGIN;

SELECT	  plan(1);

SELECT has_extension('unaccent');

SELECT	  finish();

ROLLBACK;
