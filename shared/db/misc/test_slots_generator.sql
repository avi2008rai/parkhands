CREATE SCHEMA data_gen_slots;

CREATE OR REPLACE FUNCTION data_gen_slots.random_coordinates(
  lng numeric
  , lat numeric
  , lat_dist numeric
  , lng_dist numeric
)
  RETURNS numeric[]
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _low_lat  numeric;
  _high_lat numeric;
  _low_lng  numeric;
  _high_lng numeric;
BEGIN
  _low_lat := lat - lat_dist;
  _high_lat := lat + lat_dist;
  _low_lng := lng - lng_dist;
  _high_lng := lng + lng_dist;
  RETURN ARRAY[
    random() * (_high_lng - _low_lng + 1) + _low_lng,
    random() * (_high_lat - _low_lat + 1) + _low_lat
  ];
END $$;

CREATE OR REPLACE FUNCTION data_gen_slots.random_slots(
  lng numeric
  , lat numeric
  , lat_dist numeric
  , lng_dist numeric
  , gen_limit integer
  , owner_email text
)
  RETURNS VOID
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _user             api.user;
  _counter          integer := 0;
  _limit            integer := COALESCE(gen_limit, 1000);
  _rc               numeric[];
  _last_point       text;
  _last_slot        api.slot;
  _temp_ps          api.parking_space;
BEGIN

  SELECT * INTO _user FROM api.user WHERE email = owner_email LIMIT 1;

  loop
    exit when _counter = _limit ;

    _rc := (SELECT * FROM data_gen_slots.random_coordinates(lng, lat, lat_dist, lng_dist));
    _last_point = (select * from format('SRID=4326;POINT(%s %s)', _rc[1], _rc[2]));

    -- raise warning '% lng: % lat: %', _counter, _rc[1], _rc[2];

    IF (_counter%50 = 0 OR _counter = 0) THEN
      INSERT INTO api.parking_space
      (
        id
        , name
        , owner_id
      ) VALUES (
        (SELECT * FROM uuid_generate_v4())
        , 'static-' || _counter
        , _user.id
      ) RETURNING * INTO _temp_ps;
    END IF;

    INSERT INTO api.slot (
      id,
      owner_id,
      vehicle_size_id,
      status,
      verification_status,
      name,
      price_per_hour,
      location,
      timezone,
      parking_space_id
    ) VALUES (
      (SELECT * FROM uuid_generate_v4()),
      _user.id,
      '2949716b-fbb7-4fcf-b0eb-be21471c91f5',
      'enabled',
      'verified',
      'ph-random-slot',
      10,
      (select _last_point::geometry),
      'Europe/Berlin',
      _temp_ps.id
    ) RETURNING * INTO _last_slot;

    _counter := _counter + 1;
  end loop;

END $$;

-- SELECT data_gen_slots.random_slots(84.439453125, 53.28275952823394, 30, 30, 100000, 'test_super_admin@parkhands.de');
SELECT data_gen_slots.random_slots(-98.173828125, 40.613952441166596, 12, 12, 200000, 'test_super_admin@parkhands.de');

DROP SCHEMA data_gen_slots CASCADE;
