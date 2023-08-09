-- Revert PH:fn_session_check from pg

BEGIN;

  DROP FUNCTION public.session_check();

COMMIT;
