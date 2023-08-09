-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

  -- Change location to geometry
  SELECT AddGeometryColumn('api', 'slot', 'geom_point', 4326, 'POINT', 2);

  UPDATE api.slot set geom_point = location::geometry;

  ALTER TABLE api.slot DROP COLUMN location;

  ALTER TABLE api.slot RENAME COLUMN geom_point TO location;

  CREATE INDEX slot_location_gix ON api.slot USING GIST ( location );

  ALTER TABLE api.slot ALTER COLUMN location SET NOT NULL;

  -- Add shape to slot
  SELECT AddGeometryColumn('api', 'slot', 'shape', 4326, 'POLYGON', 2);

  GRANT INSERT (
    location
    , shape
  ) ON api.slot TO base_single;

  GRANT UPDATE (
    location
    , shape
  ) ON api.slot TO base_single;

COMMIT;
