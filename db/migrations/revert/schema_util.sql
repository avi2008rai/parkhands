-- Revert PH:schema_util from pg

BEGIN;

DROP SCHEMA util;

COMMIT;
