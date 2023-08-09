-- Revert PH:fn_slot_booking_times from pg

BEGIN;

DROP FUNCTION api.slot_booking_times(api.slot_booking_times_input);
DROP TYPE api.slot_booking_times_input;

COMMIT;
