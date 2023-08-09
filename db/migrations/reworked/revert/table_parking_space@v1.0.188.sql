-- Deploy PH:table_parking_space to pg
-- requires: schema_api


BEGIN;
ALTER TABLE api.parking_space

DROP COLUMN deleted ,
DROP COLUMN deleted_at;

COMMIT;
