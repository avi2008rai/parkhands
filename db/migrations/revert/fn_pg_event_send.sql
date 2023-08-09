-- Revert PH:fn_pg_event_send from pg

BEGIN;

DROP FUNCTION util.pg_event_send(channel TEXT, payload JSON);

COMMIT;
