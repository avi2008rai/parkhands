-- Verify PH:fn_settings_get on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('settings.get(text)', 'EXECUTE'));

END $$;
