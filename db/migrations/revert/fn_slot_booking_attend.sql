-- Revert PH:fn_slot_booking_attend from pg

BEGIN;

DROP FUNCTION api.slot_booking_attend(payload api.slot_booking_attendance_input);
DROP TYPE api.slot_booking_attendance_input;
DROP TYPE public.slot_attendance;

COMMIT;
