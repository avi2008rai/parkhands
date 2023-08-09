-- Verify PH:fn_hashid_encode on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('util.hashid_encode(bigint, int)', 'EXECUTE'));

END $$;
