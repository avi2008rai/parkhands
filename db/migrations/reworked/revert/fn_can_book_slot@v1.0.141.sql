-- Revert PH:fn_can_book_slot from pg

BEGIN;

  DROP FUNCTION api.can_book_slot(payload JSON);

COMMIT;
