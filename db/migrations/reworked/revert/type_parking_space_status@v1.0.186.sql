-- Revert PH:type_parking_space_status from pg

BEGIN;

DROP TYPE public.parking_space_status;

COMMIT;
