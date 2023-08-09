-- Deploy PH:table_parking_space to pg
-- requires: schema_api


BEGIN;
ALTER TABLE api.parking_space

ADD COLUMN deleted BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN deleted_at TIMESTAMPTZ;

COMMIT;
