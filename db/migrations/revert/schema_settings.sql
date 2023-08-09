-- Revert PH:schema_settings from pg

BEGIN;

DROP SCHEMA settings;

COMMIT;
