-- Revert PH:table_private_api_key from pg

BEGIN;

DROP TABLE private.api_key;

COMMIT;
