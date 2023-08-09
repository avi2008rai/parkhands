BEGIN;

SELECT	  plan(12);

SET search_path TO settings, public;
SELECT has_table('secrets'::NAME);
SELECT has_pk('secrets'::NAME);
SELECT columns_are('secrets'::NAME,
        ARRAY[
            'key'
            , 'value'
            ]);

SELECT has_column(        'secrets'::NAME, 'key');
SELECT col_type_is(       'secrets'::NAME, 'key', 'text');
SELECT col_not_null(      'secrets'::NAME, 'key');
SELECT col_hasnt_default( 'secrets'::NAME, 'key');
SELECT col_is_pk(         'secrets'::NAME, 'key');

SELECT has_column(        'secrets'::NAME, 'value');
SELECT col_type_is(       'secrets'::NAME, 'value', 'text');
SELECT col_not_null(      'secrets'::NAME, 'value');
SELECT col_hasnt_default( 'secrets'::NAME, 'value');

SELECT	  finish();

ROLLBACK;
