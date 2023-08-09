BEGIN;

  SELECT plan(1);

  SELECT has_sequence( 'util', 'slug_uniqueness_sequence'::NAME );

  SELECT finish();

ROLLBACK;
