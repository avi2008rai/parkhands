-- Verify PH:table_parking_working_hours.sql on pg

BEGIN;

SELECT
        id
        , parking_space_availability_id
        , day_of_week
        , from_time
        , to_time
        , created_at
        , updated_at
    FROM api.parking_working_hours
        WHERE FALSE;

ROLLBACK;
