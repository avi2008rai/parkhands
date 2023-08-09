-- Revert PH:fn_generate_slug_on_name from pg

BEGIN;

  DROP FUNCTION util.generate_slug_on_name();

COMMIT;
