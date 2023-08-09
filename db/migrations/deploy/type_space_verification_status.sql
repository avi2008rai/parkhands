-- Deploy PH:type_space_verification_status to pg

BEGIN;

CREATE TYPE public.space_verification_status
    AS ENUM (
        'pending',
        'rejected',
        'verified'
    );

  COMMENT ON TYPE public.space_verification_status IS 'Allowed values for space_verification_status are: pending, rejected, verified';

COMMIT;
