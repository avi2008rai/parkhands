-- Verify PH:fn_pg_event_send on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege(
    'util.pg_event_send(text, json)', 'EXECUTE'
  ));

END $$;
