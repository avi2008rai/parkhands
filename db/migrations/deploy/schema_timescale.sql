-- Deploy PH:schema_timescale to pg

BEGIN;

CREATE SCHEMA timescale;
COMMENT ON SCHEMA timescale IS 'Timescaledb tables';

COMMIT;
