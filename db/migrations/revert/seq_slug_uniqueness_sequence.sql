-- Revert PH:seq_slug_uniqueness_sequence from pg

BEGIN;

  DROP SEQUENCE util.slug_uniqueness_sequence;

COMMIT;
