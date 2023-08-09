-- Verify PH:fn_generate_slug_on_name on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege(
    'util.generate_slug_on_name()'
    , 'EXECUTE'
  ));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'util.generate_slug_on_name()'
    , 'EXECUTE'
  ));

END $$;
