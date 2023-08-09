-- Deploy PH:type_parking_space_status to pg

BEGIN;

CREATE TYPE  public.parking_space_status
    AS ENUM (
        'enabled'
        , 'disabled'
        , 'pending'
        );
  COMMENT ON TYPE public.parking_space_status IS 'Allowed statuses are: enabled, disabled, pending';

COMMIT;
