-- Revert PH:fn_settings_get from pg

BEGIN;

DROP FUNCTION settings.get(TEXT);

COMMIT;
