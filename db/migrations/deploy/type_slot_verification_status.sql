-- Deploy PH:type_slot_verification_status to pg

BEGIN;

  CREATE TYPE public.slot_verification_status AS ENUM (
    'pending'
    , 'rejected'
    , 'verified'
  );

  COMMENT ON TYPE public.slot_verification_status IS 'Verification status for slots';

COMMIT;
