BEGIN;

SELECT plan(4);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'can_book_slot', ARRAY['json']);
  SELECT function_lang_is('can_book_slot', 'plpgsql');
  SELECT function_returns('can_book_slot', 'void');
  SELECT function_privs_are('can_book_slot', ARRAY['json'], 'public', '{}');

SELECT finish();

ROLLBACK;
