BEGIN;

SELECT	  plan(1);

SELECT has_extension('btree_gist');

SELECT	  finish();

ROLLBACK;
