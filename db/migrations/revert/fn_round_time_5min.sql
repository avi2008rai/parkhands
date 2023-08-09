-- Revert PH:fn_round_time_5min from pg

BEGIN;

DROP FUNCTION public.round_time_5min(TIMESTAMPTZ);

COMMIT;
