-- Revert PH:seq_api_key from pg

BEGIN;

DROP SEQUENCE util.api_key;

COMMIT;
