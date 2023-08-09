BEGIN;

SELECT	  plan(1);

SELECT has_extension('uuid-ossp');

SELECT	  finish();

ROLLBACK;
