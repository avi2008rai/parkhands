-- Revert PH:extension_pgtap from pg

BEGIN;

DROP EXTENSION pgtap;

COMMIT;
