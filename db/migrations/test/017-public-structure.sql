BEGIN;

  SELECT * FROM plan(6);

  SELECT has_type('public'::NAME, 'status_t'::NAME);
  SELECT has_type('public'::NAME, 'user_t'::NAME);
  SELECT has_type('public'::NAME, 'slot_status_t'::NAME);
  SELECT has_type('public'::NAME, 'booking_status_t'::NAME);

  SELECT domains_are('public'::NAME,
                     ARRAY[
                       'phone_us'
                       , 'progress_t'
                       , 'url_t'
                       , 'email'
                       ]);

  SELECT views_are('public'::NAME,
                     ARRAY[
                       'geography_columns'
                       , 'geometry_columns'
                       , 'raster_columns'
                       , 'raster_overviews'
                       , 'pg_stat_statements'
                       ]);

  SELECT * FROM finish();

ROLLBACK;
