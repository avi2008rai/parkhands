-- Deploy PH:fn_pg_event_send to pg
-- requires: schema_util
-- requires: table_pg_event

BEGIN;

CREATE OR REPLACE FUNCTION util.pg_event_send(event_key TEXT, payload JSON)
  RETURNS JSON
  LANGUAGE plpgsql
  SECURITY DEFINER
AS $FUNCTION$
BEGIN

  IF (settings.GET('pg_event_send') = '1') THEN
    INSERT INTO private.pg_event (event_key, payload)
    VALUES (event_key, payload);
  END IF;

  RETURN json_build_object(
    'success', TRUE
  );
END
$FUNCTION$;

REVOKE ALL PRIVILEGES ON FUNCTION util.pg_event_send(event_key TEXT, payload JSON) FROM public;

COMMIT;
