-- Deploy PH:type_booking_status_t to pg

BEGIN;

  CREATE TYPE public.booking_status_t
    AS ENUM (
      'pending'
      , 'reserved'
      , 'canceled'
    );

  COMMENT ON TYPE public.booking_status_t IS 'Allowed statuses for slot_booking are: pending, reserved and canceled';

COMMIT;
