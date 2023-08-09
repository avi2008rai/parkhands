-- Revert PH:schema_timescale from pg

BEGIN;

DROP SCHEMA timescale;

COMMIT;
