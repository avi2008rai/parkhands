-- Revert PH:data_language from pg

BEGIN;

DELETE FROM api.language WHERE code = 'en' OR code = 'de';

COMMIT;
