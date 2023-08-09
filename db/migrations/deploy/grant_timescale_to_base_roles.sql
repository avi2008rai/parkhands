-- Deploy PH:grant_timescale_to_base_roles to pg

BEGIN;

  GRANT USAGE ON SCHEMA timescale TO base_single;

COMMIT;
