-- Revert PH:fn_jwt_claim from pg

BEGIN;

DROP FUNCTION request.jwt_claim(TEXT);

COMMIT;
