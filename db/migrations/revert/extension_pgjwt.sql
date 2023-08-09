-- Revert PH:extension_pgjwt from pg

BEGIN;

DROP EXTENSION pgjwt;

COMMIT;
