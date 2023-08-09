-- Revert PH:fn_calc_percent from pg

BEGIN;

DROP FUNCTION public.calc_percent(amount INTEGER, total INTEGER);

COMMIT;
