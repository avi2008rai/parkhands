-- Revert PH:fn_slot_timetable from pg

BEGIN;

DROP FUNCTION api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ);

COMMIT;
