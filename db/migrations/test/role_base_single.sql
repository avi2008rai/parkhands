BEGIN;

  SELECT plan(1);

  SELECT has_role('base_single');

  SELECT finish();

ROLLBACK;
