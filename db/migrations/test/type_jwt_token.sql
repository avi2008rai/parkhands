BEGIN;

SELECT	  plan(5);

SELECT has_type('public'::NAME, 'jwt_token'::NAME);

SELECT columns_are('public'::NAME, 'jwt_token'::NAME,
        ARRAY[
            'role'
            , 'id'
            , 'exp'
            ]);

SELECT col_type_is('public'::NAME, 'jwt_token'::NAME, 'role'::NAME, 'text');
SELECT col_type_is('public'::NAME, 'jwt_token'::NAME, 'id'::NAME, 'uuid');
SELECT col_type_is('public'::NAME, 'jwt_token'::NAME, 'exp'::NAME, 'integer');
SELECT	  finish();

ROLLBACK;
