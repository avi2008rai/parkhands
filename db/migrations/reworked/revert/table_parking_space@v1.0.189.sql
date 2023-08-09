-- Deploy PH:table_parking_space to pg
-- requires: schema_api


BEGIN;
ALTER TABLE api.parking_space

DROP COLUMN business_status_reason TEXT

COMMIT;
