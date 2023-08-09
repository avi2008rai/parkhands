BEGIN;

  SELECT  plan(1);

  SELECT  has_domain('public', 'email'::NAME);

  SELECT  finish();

ROLLBACK;
