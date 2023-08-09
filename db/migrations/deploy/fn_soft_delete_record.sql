-- Deploy PH:fn_soft_delete_record to pg
-- requires: schema_util
-- requires: fn_settings_get

BEGIN;

CREATE OR REPLACE FUNCTION util.soft_delete_record() RETURNS TRIGGER AS
  $$
  DECLARE
    table_name     TEXT DEFAULT settings.get('auth.api-schema') || '.' || TG_TABLE_NAME;
  BEGIN
    EXECUTE 'UPDATE ' || table_name || ' SET deleted = TRUE, deleted_at = $1 WHERE id = $2'
    USING now(), old.id;
    RETURN NULL;
  END;
$$
LANGUAGE plpgsql security definer;

COMMIT;
