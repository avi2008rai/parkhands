-- Deploy PH:type_space_category to pg

BEGIN;

CREATE TYPE public.space_category
    AS ENUM (
        'private',
        'public'
    );

  COMMENT ON TYPE public.space_category IS 'Allowed values for space_category are: private, public';

COMMIT;
