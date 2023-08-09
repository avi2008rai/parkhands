-- Revert PH:type_booking_status_t from pg

BEGIN;

  DROP TYPE public.booking_status_t;

COMMIT;
