-- Revert PH:fn_find_slots from pg

BEGIN;

DROP FUNCTION IF EXISTS api.find_slots(api.find_slots_input);
DROP TYPE IF EXISTS api.find_slots_input;
DROP TYPE IF EXISTS api.find_slots_result;

COMMIT;
