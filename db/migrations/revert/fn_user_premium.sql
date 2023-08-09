-- Revert PH:fn_user_premium from pg

BEGIN;

  DROP FUNCTION api.user_premium(user_id UUID);

COMMIT;
