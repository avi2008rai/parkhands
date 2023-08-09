-- Deploy PH:fn_calc_percent to pg

BEGIN;

CREATE FUNCTION public.calc_percent(amount INTEGER, total INTEGER)
  RETURNS DOUBLE PRECISION AS
$$
  SELECT round(amount * 100 / total);
$$ LANGUAGE SQL;

COMMIT;
