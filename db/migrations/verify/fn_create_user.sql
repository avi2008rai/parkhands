-- Verify PH:fn_create_user on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.create_user(api.create_user_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
  	'public'
    , 'api.create_user(api.create_user_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'base_super'
    , 'api.create_user(api.create_user_input)'
    , 'EXECUTE'
  ));

END $$;
