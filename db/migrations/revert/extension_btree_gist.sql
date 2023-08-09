-- Revert PH:extension_btree_gist from pg

BEGIN;

DROP EXTENSION "btree_gist";

COMMIT;
