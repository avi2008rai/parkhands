-- Verify PH:fn_settings_set on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('settings.set(text, text)', 'EXECUTE'));

END $$;
