-- Verify PH:fn_jwt_claim on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('request.jwt_claim(text)', 'EXECUTE'));

END $$;
