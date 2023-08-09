-- Revert PH:role_base_single from pg

BEGIN;

DROP ROLE base_single;

COMMIT;
