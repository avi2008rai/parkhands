BEGIN;

  SELECT * FROM plan(10);

  SELECT sequences_are('api'::NAME, '{}');

  SELECT functions_are('api'::NAME,
    ARRAY[
      'login'
      , 'forgot_password'
      , 'me'
      , 'refresh_token'
      , 'register'
      , 'reset_password'
      , 'create_user'
      , 'update_user'
      , 'activate_user'
      , 'book_slot'
      , 'can_book_slot'
      , 'find_slots'
      , 'slot_timetable'
      , 'slot_booking_times'
      , 'email_available'
      , 'create_api_key'
      , 'delete_api_key'
      , 'get_api_keys'
      , 'authenticate_api'
      , 'user_premium'
      , 'resend_activation_email'
      , 'active_booking'
      , 'find_business'
      , 'slot_booking_status'
      , 'slot_booking_attend'
    ]
  );

  SELECT types_are('api'::NAME,
    ARRAY[
      'find_slots_input'
      , 'find_slots_result'
      , 'slot_booking_times_input'
      , 'register_input'
      , 'activate_user_input'
      , 'create_user_input'
      , 'forgot_password_input'
      , 'login_input'
      , 'update_user_input'
      , 'book_slot_input'
      , 'create_api_key_input'
      , 'create_api_key_result'
      , 'get_api_keys_result'
      , 'reset_password_input'
      , 'active_booking_input'
      , 'find_business_input'
      , 'find_business_result'
      , 'slot_booking_status_input'
      , 'slot_booking_attendance_input'
      , 'slot_timetable_result'
    ]);

  SELECT types_are('public'::NAME,
    ARRAY[
    -- system types
      '_time_trial_type'
      , 'addbandarg'
      , 'agg_count'
      , 'agg_samealignment'
      , 'box2d'
      , 'box2df'
      , 'box3d'
      , 'citext'
      , 'gbtreekey_var'
      , 'gbtreekey16'
      , 'gbtreekey32'
      , 'gbtreekey4'
      , 'gbtreekey8'
      , 'geography'
      , 'geometry_dump'
      , 'geometry'
      , 'geomval'
      , 'gidx'
      , 'rastbandarg'
      , 'raster'
      , 'reclassarg'
      , 'spheroid'
      , 'summarystats'
      , 'unionarg'
      , 'valid_detail'
    -- domains
      , 'email'
      , 'phone_us'
      , 'progress_t'
      , 'url_t'
    -- custom types
      , 'booking_status_t'
      , 'content_status_t'
      , 'jwt_token'
      , 'payment_status_t'
      , 'slot_attendance'
      , 'slot_availability_booking_status'
      , 'slot_status_t'
      , 'slot_verification_status'
      , 'status_t'
      , 'slot_business_status'
      , 'slot_category'
      , 'access_restrictions'
      , 'subscription_status_t'
      , 'user_t'
      , 'parking_space_status'
      , 'space_access_restriction'
      , 'space_category'
      , 'space_verification_status'
    ]);

  SELECT domains_are('public'::NAME, ARRAY[
    'email'
    , 'phone_us'
    , 'progress_t'
    , 'url_t'
  ]);
  SELECT domains_are('api'::NAME, '{}');

  SELECT enums_are('public'::NAME, ARRAY[
    'booking_status_t'
    , 'content_status_t'
    , 'payment_status_t'
    , 'slot_attendance'
    , 'slot_availability_booking_status'
    , 'slot_status_t'
    , 'slot_verification_status'
    , 'status_t'
    , 'subscription_status_t'
    , 'slot_category'
    , 'slot_business_status'
    , 'access_restrictions'
    , 'parking_space_status'
    , 'space_access_restriction'
    , 'space_category'
    , 'space_verification_status'
  ]);
  SELECT enums_are('api'::NAME, '{}');

  SELECT views_are('api'::NAME,
    ARRAY[
      'user_roles',
      'slot_bookings'
    ]);

  SELECT tables_are('api'::NAME,
    ARRAY[
      'country'
      , 'language'
      , 'translation'
      , 'vehicle'
      , 'vehicle_type'
      , 'user'
      , 'amenity'
      , 'slot'
      , 'slot_amenity'
      , 'slot_availability'
      , 'vehicle_size'
      , 'billing_profile'
      , 'user_subscription'
      , 'parking_space'
      , 'parking_space_availability'
      , 'parking_working_hours'
      , 'parking_open_hours'
      , 'payment_receipt'
      , 'business'
      , 'currency'
      , 'geodata_provider'
    ]);

  SELECT finish();

ROLLBACK;
