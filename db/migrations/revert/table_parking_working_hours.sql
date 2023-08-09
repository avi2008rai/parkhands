-- Revert PH:table_parking_working_hours.sql from pg

BEGIN;

DROP TABLE api. api.parking_working_hours;

COMMIT;
