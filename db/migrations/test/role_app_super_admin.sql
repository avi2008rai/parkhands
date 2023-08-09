BEGIN;

  SELECT plan(1);

  SELECT has_role('app_super_admin');

  SELECT finish();

ROLLBACK;
