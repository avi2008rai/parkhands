-- Revert PH:table_parking_space_availability.sql from pg

BEGIN;

DROP TABLE api.parking_space_availability;

COMMIT;
