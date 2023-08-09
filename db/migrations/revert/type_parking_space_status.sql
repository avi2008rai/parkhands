-- Deploy PH:type_parking_space_status to pg

BEGIN;

-- Cannot revert ENUM additions without dropping the type

COMMIT;
