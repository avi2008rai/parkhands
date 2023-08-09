-- Verify PH:fn_sign_jwt on pg

BEGIN;

SELECT has_function_privilege('auth.sign_jwt(json)', 'execute');

ROLLBACK;
