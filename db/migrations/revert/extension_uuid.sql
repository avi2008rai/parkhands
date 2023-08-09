-- Revert PH:extension_uuid from pg

BEGIN;

DROP EXTENSION "uuid-ossp";

COMMIT;
