-- Revert PH:table_private_api_token from pg

BEGIN;

DROP TABLE private.api_token;

COMMIT;
