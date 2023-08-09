-- Deploy PH:fn_settings_get to pg
-- requires: schema_settings
-- requires: table_secrets

BEGIN;

CREATE FUNCTION settings.get(TEXT) RETURNS TEXT AS $$
  SELECT value FROM settings.secrets WHERE key = $1;

$$ SECURITY DEFINER STABLE LANGUAGE SQL;

COMMIT;
