-- Verify PH:fn_slugify on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('util.slugify(text)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('public'
    , 'util.slugify(text)', 'EXECUTE'));

END $$;
