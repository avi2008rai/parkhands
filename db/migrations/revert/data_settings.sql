-- Deploy PH:set_settings to pg
-- requires: fn_settings_set

BEGIN;

DELETE FROM settings.secrets
 WHERE KEY IN (
      'pg_event_send'
     );

COMMIT;
