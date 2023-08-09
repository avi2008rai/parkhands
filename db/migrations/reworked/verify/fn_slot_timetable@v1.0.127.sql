-- Verify PH:fn_slot_timetable on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
  	'public'
    , 'api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'app_anonymous'
    , 'api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'base_single'
    , 'api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ)'
    , 'EXECUTE'
  ));

END $$;
