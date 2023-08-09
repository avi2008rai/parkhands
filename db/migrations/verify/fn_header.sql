-- Verify PH:fn_header on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('request.header(text)', 'EXECUTE'));

END $$;
