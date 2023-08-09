-- Deploy PH:type_content_status to pg

BEGIN;

CREATE TYPE public.content_status_t
    AS ENUM (
        'published'
        , 'draft'
        );
COMMENT ON TYPE public.content_status_t IS 'Allowed statuses are: published, draft';

COMMIT;
