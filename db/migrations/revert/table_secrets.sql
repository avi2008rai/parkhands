-- Revert PH:table_secrets from pg

BEGIN;

DROP TABLE settings.secrets;

COMMIT;
