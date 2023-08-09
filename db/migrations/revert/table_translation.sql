-- Revert PH:table_translation from pg

BEGIN;

  DROP TABLE api.translation;

COMMIT;
