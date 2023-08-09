-- Revert PH:fn_register from pg

BEGIN;

DROP FUNCTION IF EXISTS api.register(payload api.register_input);
DROP TYPE IF EXISTS api.register_input;

COMMIT;
