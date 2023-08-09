BEGIN;

  SELECT plan(1);

  SELECT has_role('app_single_member');

  SELECT finish();

ROLLBACK;
