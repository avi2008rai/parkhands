-- Verify PH:fn_update_user on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.update_user(api.update_user_input)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege(
	'base_single'
	, 'api.update_user(api.update_user_input)'
	, 'EXECUTE'
));

ASSERT (SELECT NOT has_function_privilege(
	'app_anonymous'
  , 'api.update_user(api.update_user_input)'
  , 'EXECUTE'
));

END $$;
