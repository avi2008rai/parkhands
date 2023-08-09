-- Revert PH:fn_check_slot_availability from pg

BEGIN;

DROP FUNCTION util.check_slot_availability(util.check_slot_availability_input);
DROP TYPE util.check_slot_availability_input;

COMMIT;
