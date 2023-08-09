-- Deploy PH:fn_round_time_5min to pg

BEGIN;

CREATE OR REPLACE FUNCTION public.round_time_5min(TIMESTAMP WITH TIME ZONE)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
  SELECT date_trunc('hour', $1) + INTERVAL '5 min' * ROUND(date_part('minute', $1) / 5.0)
$$ LANGUAGE SQL;

-- Taken from https://wiki.postgresql.org/wiki/Round_time

COMMIT;
