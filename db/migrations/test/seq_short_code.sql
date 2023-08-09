BEGIN;

  SELECT plan(1);

  SELECT has_sequence( 'util', 'short_code'::NAME );

  SELECT finish();

ROLLBACK;
