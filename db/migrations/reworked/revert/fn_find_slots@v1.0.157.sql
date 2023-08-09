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
  , total_limit     INTEGER
  , owner_id        UUID
  , slot_amenities  UUID[]
  , vehicle_sizes   UUID[]
);

CREATE TYPE api.find_slots_result AS (
  id                    UUID
  , status              slot_status_t
  , location            GEOMETRY(POINT,4326)
  , shape               GEOMETRY(POLYGON,4326)
  , parking_space_id    UUID
  , booked              BOOLEAN
  , in_working_hours    BOOLEAN
  , in_amenities        BOOLEAN
  , in_vs               BOOLEAN
);

COMMENT ON COLUMN api.find_slots_result.id IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.status IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.location IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.booked IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.in_working_hours IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.in_vs IS E'@notNull';
COMMENT ON COLUMN api.find_slots_result.in_amenities IS E'@notNull';

CREATE OR REPLACE FUNCTION api.find_slots(payload api.find_slots_input)
  RETURNS SETOF api.find_slots_result
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$

DECLARE
  _center_point           geography;
  _request_start_time     TIMESTAMPTZ DEFAULT COALESCE(payload.start_time, round_time_5min(NOW()));
  _request_end_time       TIMESTAMPTZ DEFAULT COALESCE(payload.end_time, round_time_5min(NOW()) + INTERVAL '5 minutes');
  _distance_m             INTEGER DEFAULT COALESCE(payload.distance, 1000);
  _total_limit            INTEGER DEFAULT COALESCE(payload.total_limit, 10000);
  _slot_amenities         UUID[] DEFAULT COALESCE(payload.slot_amenities, '{}');
  _vehicle_sizes          UUID[] DEFAULT COALESCE(payload.vehicle_sizes, '{}');
  _all_amenities_ids      UUID[];
  _all_vs_ids             UUID[];
  _filter_owner_id        BOOLEAN DEFAULT COALESCE((payload.owner_id IS NOT NULL)::BOOLEAN, FALSE);
  _owner_id               UUID DEFAULT COALESCE(payload.owner_id, NULL);
BEGIN
  _center_point := ST_SetSRID(ST_MakePoint(payload.longitude, payload.latitude), 4326);

  IF _request_start_time > _request_end_time THEN
    RAISE EXCEPTION 'Start time cannot be after end time!' USING ERRCODE = 'SL400';
  END IF;

  IF _distance_m > 10000 THEN
    RETURN QUERY
      SELECT
        DISTINCT ON (slot.id)
        slot.id as id
        , slot.status as status
        , slot.location as location
        , NULL::GEOMETRY(POLYGON,4326) as shape
        , slot.parking_space_id as parking_space_id
        , FALSE as booked
        , FALSE as in_working_hours
        , FALSE as in_amenities
        , FALSE as in_vs
      FROM api.slot AS slot
        WHERE NOT slot.deleted
          AND slot.status != 'unlisted'::slot_status_t
          AND ST_DWithin(slot.location, _center_point, _distance_m)
        GROUP BY slot.id
        LIMIT _total_limit;
  ELSE
    RETURN QUERY
      WITH bookings as (
        SELECT
          ts_sb.slot_id
          , (NOT COUNT(ts_sb.slot_id) = 0) as booked
        FROM timescale.slot_booking ts_sb
        LEFT JOIN api.slot AS api_s ON api_s.id = ts_sb.slot_id
          WHERE ts_sb.status != 'canceled'
          AND (
            (ts_sb.start_time, ts_sb.end_time)
              OVERLAPS
            (_request_start_time::TIMESTAMP AT TIME ZONE api_s.timezone, _request_end_time::TIMESTAMP AT TIME ZONE api_s.timezone)
          )
        GROUP BY ts_sb.slot_id
      ),
      availabilities as (
        SELECT
          api_sa.slot_id
          , (NOT COUNT(api_sa.slot_id) = 0) as available
        FROM api.slot_availability api_sa
          WHERE
            EXTRACT(DOW FROM _request_start_time::TIMESTAMPTZ) = api_sa.day_of_week
            AND tstzrange(
            (date(_request_start_time::timestamptz) + api_sa.start_hour::TIME)::timestamptz,
            (date(_request_end_time::timestamptz) + api_sa.end_hour::TIME)::timestamptz
          ) @> tstzrange(_request_start_time::timestamptz, _request_end_time::timestamptz)
        GROUP BY api_sa.slot_id
      ),
      amenities as (
        SELECT
          asa.slot_id
          , array_agg(asa.amenity_id) as amenities
        FROM api.slot_amenity as asa
          WHERE asa.amenity_id = ANY(_slot_amenities)
        GROUP BY asa.slot_id
      )
      SELECT
        DISTINCT ON (slot.id)
        slot.id as id
        , slot.status as status
        , slot.location as location
        , slot.shape as shape
        , slot.parking_space_id as parking_space_id
        , COALESCE(bks.booked, FALSE) as booked
        , COALESCE(slot_wh.available, FALSE) as in_working_hours
        , COALESCE((SELECT asa.amenities @> _slot_amenities), (CARDINALITY(_slot_amenities) = 0)) as in_amenities
        , (SELECT slot.vehicle_size_id = ANY(_vehicle_sizes)) as in_vs
      FROM api.slot AS slot
      LEFT JOIN amenities asa ON asa.slot_id = slot.id
      LEFT JOIN availabilities as slot_wh ON slot_wh.slot_id = slot.id
      LEFT JOIN bookings as bks ON bks.slot_id = slot.id
        WHERE NOT slot.deleted
          AND (
            NOT _filter_owner_id
            OR (
              _filter_owner_id
              AND slot.owner_id = _owner_id
            )
          )
          AND slot.status != 'unlisted'::slot_status_t
          AND ST_DWithin(slot.location, _center_point, _distance_m)
        GROUP BY slot.id, bks.booked, slot_wh.available, asa.amenities
        LIMIT _total_limit;
  END IF;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.find_slots(api.find_slots_input) FROM public;

COMMENT ON FUNCTION api.find_slots(api.find_slots_input) IS 'find slots based on specific criterias';

-- set grants
GRANT EXECUTE ON FUNCTION api.find_slots(api.find_slots_input) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.find_slots(api.find_slots_input) TO base_single;

COMMIT;
