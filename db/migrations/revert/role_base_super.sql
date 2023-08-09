-- Revert PH:role_base_super from pg

BEGIN;

DROP ROLE base_super;

COMMIT;
