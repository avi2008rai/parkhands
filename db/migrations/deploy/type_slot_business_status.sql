-- Deploy PH:type_business_status to pg

BEGIN;

  CREATE TYPE public.slot_business_status
    AS ENUM (
      'active'
      , 'inactive'
    );

  COMMENT ON TYPE public.slot_business_status IS 'values for business_status are: active, inactive';

COMMIT;
