-- Verify PH:fn_calc_percent on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('public.calc_percent(integer, integer)', 'EXECUTE'));

END $$;
