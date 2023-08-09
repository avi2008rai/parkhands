-- Deploy PH:domain_phone_us to pg

BEGIN;

  -- phone domain will allow numbers consisting of:
  -- digits 0-9
  -- letters a-z (no matter of capitalisation)
  -- symbols -+().

  CREATE DOMAIN public.phone_us AS TEXT
    CONSTRAINT relaxed_phone_validation
    CHECK (
      VALUE ~ '^[0-9a-z +().-]{7,}$'
      );

  COMMENT ON DOMAIN public.phone_us IS 'Relaxed phone number validation';

COMMIT;
