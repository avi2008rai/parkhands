-- Deploy PH:type_slot_status_t to pg

BEGIN;

  CREATE TYPE public.slot_status_t
    AS ENUM (
      'enabled'
      , 'disabled'
    );

  COMMENT ON TYPE public.slot_status_t IS 'Allowed statuses for slot are: enabled, disabled';

COMMIT;
