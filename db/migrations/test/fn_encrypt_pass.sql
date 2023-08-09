BEGIN;

  SELECT	  plan(8);

  SET search_path TO auth, PUBLIC;

  SELECT has_function('auth', 'encrypt_pass'::NAME);
  SELECT function_lang_is('encrypt_pass', 'plpgsql');
  SELECT function_returns('encrypt_pass', 'trigger');
  SELECT function_privs_are('encrypt_pass', ARRAY[''], 'public', '{}');

  CREATE TEMPORARY TABLE _password_test (
    PASSWORD TEXT NOT NULL DEFAULT ''
    ,_id  UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  );

  CREATE TRIGGER trg_encrypt__password_test
    BEFORE INSERT OR UPDATE
    ON _password_test
    FOR EACH ROW
      EXECUTE PROCEDURE auth.encrypt_pass();

  PREPARE catch_short_pass    AS INSERT INTO _password_test (PASSWORD) VALUES('short');
  PREPARE check_lower_in_pass AS INSERT INTO _password_test (PASSWORD) VALUES('UPPER-UPPER');
  PREPARE check_upper_in_pass AS INSERT INTO _password_test (PASSWORD) VALUES('lower-lower');
  PREPARE check_digit_in_pass AS INSERT INTO _password_test (PASSWORD) VALUES('No-digits-in-psas');

  SELECT throws_ok(
    'catch_short_pass'
    , 'RPA01'
    , NULL
    , 'password must be at least 8 symbols'
  );
  SELECT lives_ok(
    'check_lower_in_pass'
  , 'password did not require lower case symbol');
  SELECT lives_ok(
    'check_upper_in_pass'
    , 'password did not require upper case symbol'
  );
  SELECT lives_ok(
    'check_digit_in_pass'
    , 'password did not require digit'
  );

  SELECT	  finish();

ROLLBACK;
