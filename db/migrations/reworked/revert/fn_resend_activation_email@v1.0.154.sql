-- Revert PH:fn_resend_activation_email from pg

BEGIN;

  DROP FUNCTION api.resend_activation_email(requested_email email);

COMMIT;
