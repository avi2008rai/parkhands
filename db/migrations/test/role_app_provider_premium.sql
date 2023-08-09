BEGIN;

  SELECT plan(1);

  SELECT has_role('app_provider_premium');

  SELECT finish();

ROLLBACK;
