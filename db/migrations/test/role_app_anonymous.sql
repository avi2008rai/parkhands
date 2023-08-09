BEGIN;

SELECT plan(1);

SELECT has_role('app_anonymous');

SELECT finish();

ROLLBACK;
