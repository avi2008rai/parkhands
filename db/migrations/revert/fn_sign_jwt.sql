-- Revert PH:fn_sign_jwt from pg

BEGIN;

DROP FUNCTION auth.sign_jwt(json);

COMMIT;
