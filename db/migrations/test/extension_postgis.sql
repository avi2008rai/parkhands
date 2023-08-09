BEGIN;

SELECT	  plan(1);

SELECT has_extension('postgis');

SELECT	  finish();

ROLLBACK;
