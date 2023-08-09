-- Deploy PH:type_space_access_restriction to pg

BEGIN;

CREATE TYPE public.space_access_restriction
    AS ENUM (
      'none'
     , 'barrier'
      , 'keycard'
     , 'keycode'
    );

COMMENT ON TYPE public.space_access_restriction IS 'Allowed values for access_restrictions are: none, barrier, keycard, keycode';

COMMIT;
