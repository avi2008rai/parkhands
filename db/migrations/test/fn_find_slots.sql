BEGIN;

  SELECT plan(29);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'find_slots', ARRAY['find_slots_input']);
  SELECT function_lang_is('find_slots', 'plpgsql');
  SELECT function_returns('find_slots', 'setof find_slots_result');

  SELECT function_privs_are(
    'find_slots'
    , ARRAY['find_slots_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'find_slots'
    , ARRAY['find_slots_input']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'find_slots'
    , ARRAY['find_slots_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'find_slots'
    , ARRAY['find_slots_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );


  SELECT has_type('api'::NAME, 'find_slots_input'::NAME);

  SELECT columns_are('api'::NAME, 'find_slots_input'::NAME,
          ARRAY[
              'latitude'
              , 'longitude'
              , 'start_time'
              , 'end_time'
              , 'distance'
              , 'total_limit'
              , 'owner_id'
              , 'slot_amenities'
              , 'vehicle_sizes'
              ]);

  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'latitude'::NAME, 'numeric');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'longitude'::NAME, 'numeric');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'start_time'::NAME, 'timestamp with time zone');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'end_time'::NAME, 'timestamp with time zone');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'distance'::NAME, 'integer');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'total_limit'::NAME, 'integer');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'owner_id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'slot_amenities'::NAME, 'uuid[]');
  SELECT col_type_is('api'::NAME, 'find_slots_input'::NAME, 'vehicle_sizes'::NAME, 'uuid[]');


  SELECT has_type('api'::NAME, 'find_slots_result'::NAME);

  SELECT columns_are('api'::NAME, 'find_slots_result'::NAME,
          ARRAY[
              'id'
              , 'status'
              , 'location'
              , 'shape'
              , 'parking_space_id'
              , 'booked'
              , 'in_working_hours'
              , 'in_amenities'
              , 'in_vs'
              ]);

  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'status'::NAME, 'slot_status_t');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'location'::NAME, 'geometry(Point,4326)');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'shape'::NAME, 'geometry(Polygon,4326)');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'parking_space_id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'booked'::NAME, 'boolean');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'in_working_hours'::NAME, 'boolean');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'in_amenities'::NAME, 'boolean');
  SELECT col_type_is('api'::NAME, 'find_slots_result'::NAME, 'in_vs'::NAME, 'boolean');

  SELECT finish();

ROLLBACK;
