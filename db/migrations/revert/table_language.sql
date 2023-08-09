-- Revert PH:table_language from pg

BEGIN;

DROP TABLE api.language;

COMMIT;
