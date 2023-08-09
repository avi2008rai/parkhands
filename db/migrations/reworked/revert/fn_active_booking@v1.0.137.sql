-- Revert PH:fn_active_booking from pg

BEGIN;

  DROP FUNCTION api.active_booking(payload api.active_booking_input);
  DROP TYPE IF EXISTS api.active_booking_input;

COMMIT;
