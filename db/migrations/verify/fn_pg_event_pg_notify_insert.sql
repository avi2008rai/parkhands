-- Verify PH:fn_pg_event_pg_notify_insert on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('util.pg_event_pg_notify_insert()'
    , 'execute'));

END $$;
