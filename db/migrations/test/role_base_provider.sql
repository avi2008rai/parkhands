BEGIN;

  SELECT plan(1);

  SELECT has_role('base_provider');

  SELECT finish();

ROLLBACK;
