BEGIN;

  SELECT plan(1);

  SELECT has_role('base_super');

  SELECT finish();

ROLLBACK;
