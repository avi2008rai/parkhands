-- Deploy PH:table_parking_open_hours.sql to pg

BEGIN;

    ALTER TABLE api.parking_open_hours ALTER COLUMN currency SET NOT NULL;
    ALTER TABLE api.parking_open_hours ALTER COLUMN currency TYPE CITEXT;

COMMIT;


