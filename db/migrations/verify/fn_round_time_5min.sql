-- Verify PH:fn_round_time_5min on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('public.round_time_5min(timestamptz)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('public'
    , 'public.round_time_5min(timestamptz)', 'EXECUTE'));

END $$;
