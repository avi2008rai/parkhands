-- Revert PH:fn_set_updated_at from pg

BEGIN;

DROP FUNCTION util.set_updated_at();

COMMIT;
