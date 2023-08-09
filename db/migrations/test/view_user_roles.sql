BEGIN;

  SELECT	  plan(12);

  SET SEARCH_PATH TO api, PUBLIC;

  SELECT has_view('user_roles');
  SELECT columns_are(
    'user_roles',
    ARRAY[
      'id'
      , 'name'
      , 'scope'
      , 'memberof'
      , 'ui'
      ]
  );

  SELECT has_column(  'user_roles', 'id');
  SELECT col_type_is( 'user_roles', 'id', 'name');

  SELECT has_column(  'user_roles', 'name');
  SELECT col_type_is( 'user_roles', 'name', 'text');

  SELECT has_column(  'user_roles', 'scope');
  SELECT col_type_is( 'user_roles', 'scope', 'text[]');

  SELECT has_column(  'user_roles', 'memberof');
  SELECT col_type_is( 'user_roles', 'memberof', 'name[]');

  SELECT has_column(  'user_roles', 'ui');
  SELECT col_type_is( 'user_roles', 'ui', 'boolean');

  SELECT	  finish();

ROLLBACK;
