BEGIN;

SELECT	  plan(2);

SELECT has_schema('request');
SELECT schema_privs_are('request', 'public', ARRAY['USAGE']);

SELECT	  finish();

ROLLBACK;
