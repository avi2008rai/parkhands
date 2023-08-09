-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

  ALTER TABLE api.slot ADD COLUMN geog_point GEOGRAPHY(POINT,4326);

  UPDATE api.slot set geog_point = location::geography;

  ALTER TABLE api.slot DROP COLUMN location;

  ALTER TABLE api.slot RENAME COLUMN geog_point TO location;

  CREATE INDEX slot_location_gix ON api.slot USING GIST ( location );

  ALTER TABLE api.slot ALTER COLUMN location SET NOT NULL;

  GRANT INSERT (
    location
  ) ON api.slot TO base_single;

  GRANT UPDATE (
    location
  ) ON api.slot TO base_single;

  ALTER TABLE api.slot DROP COLUMN shape;

COMMIT;
