-- Deploy PH:fn_session_check to pg
-- requires: table_user

BEGIN;

CREATE OR REPLACE FUNCTION public.session_check()
  RETURNS void
  LANGUAGE PLPGSQL
AS $$
DECLARE
  _user_id    UUID DEFAULT request.user_id();
BEGIN
  -- Check user session and raise error if non-existant
  IF (_user_id IS NULL) THEN
    RAISE EXCEPTION 'Session is wrong!' USING ERRCODE = 'US400';
  END IF;
END $$;

COMMIT;
