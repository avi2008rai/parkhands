BEGIN;

SELECT plan(11);

SELECT has_type('public'::NAME, 'user_t'::NAME);

SELECT columns_are('public'::NAME, 'user_t'::NAME,
        ARRAY[
            'id'
            , 'name'
            , 'email'
            , 'photo_url'
            , 'phone'
            , 'role'
            , 'status'
            , 'settings'
            , 'address'
            ]);

SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'id'::NAME, 'uuid');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'name'::NAME, 'text');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'email'::NAME, 'text');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'photo_url'::NAME, 'text');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'phone'::NAME, 'phone_us');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'role'::NAME, 'text');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'status'::NAME, 'status_t'::NAME);
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'settings'::NAME, 'json');
SELECT col_type_is('public'::NAME, 'user_t'::NAME, 'address'::NAME, 'json');

SELECT finish();

ROLLBACK;
