-- Revert PH:extension_pgcrypto from pg

BEGIN;

DROP EXTENSION pgcrypto;

COMMIT;
