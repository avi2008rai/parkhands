-- Verify PH:fn_activate_user on pg

DO $$
BEGIN

	ASSERT (SELECT has_function_privilege('api.activate_user(api.activate_user_input)', 'EXECUTE'));

	ASSERT (SELECT NOT has_function_privilege(
    'public'
	  , 'api.activate_user(api.activate_user_input)'
	  , 'EXECUTE'
	));

	ASSERT (SELECT has_function_privilege(
    'base_single'
	  , 'api.activate_user(api.activate_user_input)'
	  , 'EXECUTE'
	));

END $$;
