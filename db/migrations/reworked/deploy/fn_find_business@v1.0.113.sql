-- Deploy PH:fn_find_business to pg
-- requires: table_business

BEGIN;

CREATE TYPE api.find_business_input AS (
  latitude          NUMERIC
  , longitude       NUMERIC
  , distance        INTEGER
  , total_limit     INTEGER
);

CREATE TYPE api.find_business_result AS (
  id                UUID
  , owner_id        UUID
  , name            TEXT
  , description     TEXT
  , address         JSON
  , photo_url       TEXT
  , marker_url      TEXT
  , location        GEOGRAPHY(POINT,4326)
  , slug            TEXT
  , created_at      TIMESTAMPTZ
  , distance        INTEGER
);

COMMENT ON COLUMN api.find_business_result.id IS E'@notNull';
COMMENT ON COLUMN api.find_business_result.name IS E'@notNull';
COMMENT ON COLUMN api.find_business_result.owner_id IS E'@notNull';
COMMENT ON COLUMN api.find_business_result.location IS E'@notNull';
COMMENT ON COLUMN api.find_business_result.created_at IS E'@notNull';

CREATE OR REPLACE FUNCTION api.find_business(payload api.find_business_input)
  RETURNS SETOF api.find_business_result
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$

DECLARE
  _center_point         geography;
  _distance_m           INTEGER DEFAULT COALESCE(payload.distance, 1000);
  _total_limit          INTEGER DEFAULT COALESCE(payload.total_limit, 100);
  business_in_distance     UUID[];
BEGIN
  _center_point := ST_SetSRID(ST_MakePoint(payload.longitude, payload.latitude), 4326);

  IF _total_limit > 100 THEN
    _total_limit := 100;
  END IF;

  -- Find business listings in distance
  SELECT INTO business_in_distance
    ARRAY_AGG(sub.id)
  FROM (
    SELECT
      business.id
    FROM api.business AS business
    WHERE ST_DWithin(business.location, _center_point, _distance_m)
    ORDER BY business.location::geometry <-> _center_point
    LIMIT _total_limit
  ) AS sub;

  RETURN QUERY
    SELECT * FROM (
      SELECT
        DISTINCT ON (business.id)
        business.id
        , business.owner_id
        , business.name
        , business.description
        , business.address
        , business.photo_url
        , business.marker_url
        , business.location
        , business.slug
        , business.created_at
        , (ST_Distance(business.location, _center_point))::INTEGER AS distance
        FROM api.business AS business
        WHERE business.id = ANY (business_in_distance)
    ) AS sub
    ORDER BY sub.distance ASC
    LIMIT _total_limit;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.find_business(api.find_business_input) FROM public;

COMMENT ON FUNCTION api.find_business(api.find_business_input) IS 'find businesss listings based on specific criterias';

-- set grants
GRANT EXECUTE ON FUNCTION api.find_business(api.find_business_input) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.find_business(api.find_business_input) TO base_single;

COMMIT;
