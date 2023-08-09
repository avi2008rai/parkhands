-- Deploy PH:fn_settings_set to pg
-- requires: schema_settings
-- requires: table_secrets

BEGIN;

CREATE FUNCTION settings.set(TEXT, TEXT) RETURNS VOID AS $$
INSERT INTO settings.secrets
    (key, value)
	  VALUES ($1, $2)
	  ON CONFLICT (KEY)
    DO UPDATE SET value = $2;

$$ SECURITY DEFINER LANGUAGE SQL;

COMMIT;
