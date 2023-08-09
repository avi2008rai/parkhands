BEGIN;

  SELECT plan(1);

  SELECT has_sequence( 'util', 'api_key'::NAME );

  SELECT finish();

ROLLBACK;
