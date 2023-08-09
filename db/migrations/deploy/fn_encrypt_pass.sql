-- Deploy PH:fn_encrypt_pass to pg
-- requires: schema_auth
-- requires: extension_pgcrypto

BEGIN;

  CREATE OR REPLACE FUNCTION auth.encrypt_pass() RETURNS TRIGGER AS
  $$
    BEGIN
      IF ((tg_op = 'UPDATE' AND new.password <> old.password)
          OR (tg_op = 'INSERT')) THEN

        IF LENGTH(NEW.PASSWORD) < 8 THEN
          RAISE EXCEPTION 'Password should be at least 8 symbols'
          USING ERRCODE = 'RPA01';
        END IF;

        new.password = public.crypt(new.password, public.gen_salt('bf'));
      END IF;
      RETURN NEW;
    END
  $$ LANGUAGE plpgsql;
  -- by default all functions are accessible to the public, we need to remove
  -- that and define our specific access rules
  REVOKE ALL PRIVILEGES ON FUNCTION auth.encrypt_pass() FROM public;

COMMIT;
