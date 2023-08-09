-- Deploy PH:set_settings to pg
-- requires: fn_settings_set

BEGIN;

SELECT settings.SET('pg_event_send', '1');

COMMIT;
