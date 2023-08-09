-- Revert PH:fn_email_available from pg

BEGIN;

  DROP FUNCTION api.email_available(requested_email email);

COMMIT;
