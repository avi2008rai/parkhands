-- Deploy PH:schema_settings to pg

BEGIN;

CREATE SCHEMA settings;
COMMENT ON SCHEMA settings IS 'Simple key=value settings';

COMMIT;
