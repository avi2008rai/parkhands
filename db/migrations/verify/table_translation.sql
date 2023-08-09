-- Verify PH:table_translation on pg

BEGIN;

  SELECT
    key
    , lang
    , translation
    , namespace
    , created_at
    , updated_at
  FROM api.translation
    WHERE FALSE;

  SELECT 1/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_translation_set_updated_at'
  );

ROLLBACK;
