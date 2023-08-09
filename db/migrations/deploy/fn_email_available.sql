-- Deploy PH:fn_email_available to pg
-- requires: schema_api

BEGIN;

CREATE OR REPLACE FUNCTION api.email_available(requested_email email)
  RETURNS BOOLEAN
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  is_available      BOOLEAN;
BEGIN

  SELECT count(*) = 0
    INTO is_available
  FROM api.user au
    WHERE au.email = requested_email
      AND au.deleted = FALSE;

  RETURN is_available;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.email_available(requested_email email) FROM public;

COMMENT ON FUNCTION api.email_available(requested_email email) IS 'Check if email is free for registration';

-- set grants
GRANT EXECUTE ON FUNCTION api.email_available(requested_email email) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.email_available(requested_email email) TO base_single;

COMMIT;
