-- Deploy PH:fn_encrypt_api_key to pg
-- requires: schema_auth
-- requires: extension_pgcrypto

BEGIN;

  CREATE OR REPLACE FUNCTION auth.encrypt_api_key() RETURNS TRIGGER AS
  $$
    BEGIN
      IF ((tg_op = 'UPDATE' AND new.api_key <> old.api_key)
          OR (tg_op = 'INSERT')) THEN
        new.api_key = public.crypt(new.api_key, public.gen_salt('bf'));
      END IF;
      RETURN NEW;
    END
  $$ LANGUAGE plpgsql;
  -- by default all functions are accessible to the public, we need to remove
  -- that and define our specific access rules
  REVOKE ALL PRIVILEGES ON FUNCTION auth.encrypt_api_key() FROM public;

COMMIT;
