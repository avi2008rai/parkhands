-- Revert PH:extension_unaccent from pg

BEGIN;

DROP EXTENSION "unaccent";

COMMIT;
