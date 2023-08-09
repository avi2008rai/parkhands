-- Deploy PH:domain_progress_t to pg

BEGIN;

CREATE DOMAIN public.progress_t AS INTEGER
  CHECK ( VALUE BETWEEN 0 AND 100 );

COMMENT ON DOMAIN public.progress_t IS 'Can hold values from 0 to 100 as progress never go outside of this range';

COMMIT;
