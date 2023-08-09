-- Revert PH:fn_slugify from pg

BEGIN;

  DROP FUNCTION IF EXISTS util.slugify(value TEXT);

COMMIT;
