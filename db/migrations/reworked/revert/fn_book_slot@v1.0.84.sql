-- Revert PH:fn_book_slot from pg

BEGIN;

  DROP FUNCTION IF EXISTS api.book_slot(payload api.book_slot_input);
  DROP TYPE IF EXISTS api.book_slot_input;

COMMIT;
