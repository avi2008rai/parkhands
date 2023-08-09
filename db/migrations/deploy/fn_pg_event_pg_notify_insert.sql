-- Deploy PH:fn_pg_event_pg_notify_insert to pg
-- requires: schema_util
-- requires: table_pg_event

BEGIN;

CREATE OR REPLACE FUNCTION util.pg_event_pg_notify_insert()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
AS $FUNCTION$
DECLARE
  tmp_r       record;
  id_as_json  TEXT;
BEGIN
  id_as_json := FORMAT('{"pg_event_id": "%s"}', NEW.id);

  UPDATE private.pg_event pge
    SET payload = payload::jsonb || id_as_json::jsonb
    WHERE id = NEW.id
  RETURNING * INTO tmp_r;

  EXECUTE FORMAT('notify "e:%s", %s', NEW.event_key, quote_literal(tmp_r.payload));
  RETURN NEW;

END
$FUNCTION$;

REVOKE ALL PRIVILEGES ON FUNCTION util.pg_event_pg_notify_insert() FROM PUBLIC;

COMMIT;
