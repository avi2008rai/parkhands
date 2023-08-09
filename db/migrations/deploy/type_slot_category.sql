-- Deploy PH:type_slot_category to pg

BEGIN;

  CREATE TYPE public.slot_category
    AS ENUM (
        'private',
        'public'
    );

  COMMENT ON TYPE public.slot_category IS 'Allowed values for slot_category are: private, public';

COMMIT;
