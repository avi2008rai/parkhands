-- Deploy PH:type_access_restrictions to pg

BEGIN;

  CREATE TYPE public.access_restrictions
    AS ENUM (
      'none'
      , 'barrier'
      , 'keycard'
      , 'keycode'
    );

  COMMENT ON TYPE public.access_restrictions IS 'Allowed values for access_restrictions are: none, barrier, keycard, keycode';

COMMIT;
