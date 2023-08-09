-- Verify PH:table_secrets on pg

BEGIN;

SELECT
  KEY
  , VALUE
  FROM settings.secrets
  WHERE false;

ROLLBACK;
