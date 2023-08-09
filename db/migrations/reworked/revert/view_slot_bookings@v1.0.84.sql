-- Revert PH:view_slot_bookings from pg

BEGIN;

  DROP VIEW api.slot_bookings;

COMMIT;
