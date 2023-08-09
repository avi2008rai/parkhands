-- Deploy PH:type_slot_status_t to pg

BEGIN;

-- Cannot revert ENUM additions without dropping the type

COMMIT;
