-- Revert PH:grant_timescale_to_base_roles from pg

BEGIN;

  REVOKE USAGE ON SCHEMA timescale FROM base_single;

COMMIT;
