-- Revert PH:fn_settings_set from pg

BEGIN;

DROP FUNCTION settings.set(TEXT, TEXT);

COMMIT;
