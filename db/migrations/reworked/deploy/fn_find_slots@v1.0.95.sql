-- Deploy PH:fn_find_slots to pg
-- requires: table_slot
-- requires: table_slot_amenity
BEGIN;

DROP FUNCTION api.find_slots(payload api.find_slots_input);
DROP TYPE api.find_slots_input;
DROP TYPE api.find_slots_result;

CREATE TYPE api.find_slots_input AS (
  latitude          NUMERIC
  , longitude       NUMERIC
  , start_time      TIMESTAMPTZ
  , end_time        TIMESTAMPTZ
  , distance        INTEGER
  , nearest         BOOLEAN
  , total_limit     INTEGER
  , include_booked  BOOLEAN
  , owner_id        UUID
  , slot_amenities  UUID[]
  , vehicle_sizes   UUID[]
);

CREATE TYPE api.find_slots_result AS (
  id                  UUID
  , name              TEXT
  , owner_id          UUID
  , address           JSON
  , timezone          TEXT
  , price_per_hour    NUMERIC
  , status            slot_status_t
  , photo_url         TEXT
  , description       TEXT
  , notes             TEXT
  , location          GEOGRAPHY(POINT,4326)
  , slug              TEXT
  , created_at        TIMESTAMPTZ
  , distance          INTEGER
  , booked            BOOLEAN
  , amenities         api.amenity[]
  , vehicle_size      api.vehicle_size[]
);

COMMENT ON COLUMN api.find_slots_result.id IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.name IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.timezone IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.owner_id IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.status IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.price_per_hour IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.location IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.created_at IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.vehicle_size IS E'@notNull';

CREATE OR REPLACE FUNCTION api.find_slots(payload api.find_slots_input)
  RETURNS SETOF api.find_slots_result
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$

DECLARE
  _center_point         geography;
  _request_start_time   TIMESTAMPTZ DEFAULT COALESCE(payload.start_time, round_time_5min(NOW()));
  _request_end_time     TIMESTAMPTZ DEFAULT COALESCE(payload.end_time, round_time_5min(NOW()) + INTERVAL '5 minutes');
  _distance_m           INTEGER DEFAULT COALESCE(payload.distance, 1000);
  _nearest              BOOLEAN DEFAULT COALESCE(payload.nearest, FALSE);
  _total_limit          INTEGER DEFAULT COALESCE(payload.total_limit, 100);
  _include_booked       BOOLEAN DEFAULT COALESCE(payload.include_booked, FALSE);
  _slot_amenities       UUID[] DEFAULT COALESCE(payload.slot_amenities, '{}');
  _filter_amenities     BOOLEAN DEFAULT COALESCE((cardinality(payload.slot_amenities) > 0)::BOOLEAN, FALSE);
  _vehicle_sizes        UUID[] DEFAULT COALESCE(payload.vehicle_sizes, '{}');
  _filter_vehicle_sizes BOOLEAN DEFAULT COALESCE((cardinality(payload.vehicle_sizes) > 0)::BOOLEAN, FALSE);
  _filter_owner_id      BOOLEAN DEFAULT COALESCE((payload.owner_id IS NOT NULL)::BOOLEAN, FALSE);
  _owner_id             UUID DEFAULT COALESCE(payload.owner_id, NULL);
  slots_in_distance     UUID[];
  slots_in_use          UUID[];
BEGIN
  _center_point := ST_SetSRID(ST_MakePoint(payload.longitude, payload.latitude), 4326);

  IF _total_limit > 100 THEN
    _total_limit := 100;
  END IF;

  IF _request_start_time > _request_end_time THEN
    RAISE EXCEPTION 'Start time cannot be after end time!' USING ERRCODE = 'SL400';
  END IF;

  -- Find slots in distance or nearest
  SELECT INTO slots_in_distance
      ARRAY_AGG(sub.id)
    FROM (
      SELECT
        slot.id
      FROM api.slot AS slot
      WHERE _nearest
        OR (
          NOT _nearest
          AND ST_DWithin(slot.location, _center_point, _distance_m)
        )
      ORDER BY slot.location::geometry <-> _center_point
      LIMIT _total_limit
    ) AS sub;

  -- Filter slots by availability hours
  SELECT INTO slots_in_distance
    util.check_slot_availability((
      slots_in_distance
      , _request_start_time
      , _request_end_time
    )::util.check_slot_availability_input);

  -- Get slots booked by requested booking timeframe
  SELECT INTO slots_in_use
      ARRAY_AGG(sub.id)
    FROM (
      SELECT
        slot.id
      FROM api.slot AS slot
      WHERE slot.id = ANY (slots_in_distance)
            AND EXISTS (
                SELECT 1
                FROM timescale.slot_booking AS sb
                WHERE sb.slot_id = slot.id
                  AND (sb.start_time, sb.end_time) OVERLAPS (_request_start_time, _request_end_time)
                  AND sb.status != 'canceled'::booking_status_t
              )
    ) AS sub;

  IF NOT _include_booked THEN
    -- Remove slots_in_use from slots_in_distance array
    SELECT INTO slots_in_distance
      ARRAY(
      SELECT UNNEST(slots_in_distance)
      EXCEPT SELECT UNNEST(slots_in_use)
    );
  END IF;

  RETURN QUERY
    SELECT * FROM (
      SELECT
        DISTINCT ON (slot.id)
        slot.id
        , slot.name
        , slot.owner_id
        , slot.address
        , slot.timezone
        , slot.price_per_hour
        , slot.status
        , slot.photo_url
        , slot.description
        , slot.notes
        , slot.location
        , slot.slug
        , slot.created_at
        , (ST_Distance(slot.location, _center_point))::INTEGER AS distance
        , (
          CASE
            WHEN (cardinality(slots_in_use) > 0 AND slot.id = ANY (slots_in_use)) THEN TRUE
            ELSE FALSE
          END
        ) AS booked
        , (
          SELECT
            array_agg(am)
            FROM api.slot_amenity AS slam
            JOIN api.amenity AS am ON slam.amenity_id = am.id
            WHERE slam.slot_id = slot.id
        ) AS amenities
        , (
          SELECT
            array_agg(vs)
            FROM api.vehicle_size AS vs
            WHERE slot.vehicle_size_id = vs.id
        ) AS vehicle_size
        FROM api.slot AS slot
        WHERE
            NOT slot.deleted
        AND slot.status != 'unlisted'::slot_status_t
        AND slot.id = ANY (slots_in_distance)
        AND (
          NOT _filter_amenities
          OR (
            _filter_amenities
            AND (
              SELECT
                TRUE
                FROM api.slot_amenity AS slam
                WHERE slam.slot_id = slot.id
                GROUP BY slam.slot_id
                HAVING array_agg(slam.amenity_id) @> _slot_amenities
            )
          )
        )
        AND (
          NOT _filter_vehicle_sizes
          OR (
            _filter_vehicle_sizes
            AND slot.vehicle_size_id = ANY(_vehicle_sizes)
          )
        )
        AND (
          NOT _filter_owner_id
          OR (
            _filter_owner_id
            AND slot.owner_id = _owner_id
          )
        )
    ) AS sub
    ORDER BY sub.distance ASC
    LIMIT _total_limit;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.find_slots(api.find_slots_input) FROM public;

COMMENT ON FUNCTION api.find_slots(api.find_slots_input) IS 'find slots based on specific criterias';

-- set grants
GRANT EXECUTE ON FUNCTION api.find_slots(api.find_slots_input) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.find_slots(api.find_slots_input) TO base_single;

COMMIT;
