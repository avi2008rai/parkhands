-- Deploy PH:type_status to pg

BEGIN;

CREATE TYPE public.status_t
    AS ENUM (
        'enabled'
        , 'disabled'
        , 'pending'
        );
COMMENT ON TYPE public.status_t IS 'Allowed statuses are: enabled, disabled, pending';

COMMIT;
