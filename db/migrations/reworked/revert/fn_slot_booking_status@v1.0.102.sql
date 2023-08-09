-- Revert PH:fn_slot_booking_status from pg

BEGIN;

  DROP FUNCTION api.slot_booking_status(payload api.slot_booking_status_input);
  DROP TYPE public.slot_availability_booking_status;
  DROP TYPE api.slot_booking_status_input;

COMMIT;
