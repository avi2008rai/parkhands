-- Deploy PH:fn_hashid_encode to pg
-- requires: schema_util

BEGIN;

CREATE OR REPLACE FUNCTION util.hashid_encode(num BIGINT, hash_length INTEGER DEFAULT 6)
  RETURNS TEXT AS
$$
  DECLARE
  salt    TEXT DEFAULT settings.get('pg_hashids.salt');
BEGIN
  RETURN public.id_encode(num, salt, hash_length);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER IMMUTABLE STRICT;

COMMIT;
