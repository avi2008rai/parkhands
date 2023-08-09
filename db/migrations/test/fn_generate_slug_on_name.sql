BEGIN;

  SELECT plan(19);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'generate_slug_on_name'::NAME);
  SELECT function_lang_is('generate_slug_on_name', 'plpgsql');
  SELECT function_returns('generate_slug_on_name', 'trigger');
  SELECT function_privs_are('generate_slug_on_name', ARRAY[''], 'public', '{}');

  CREATE TEMPORARY TABLE _slug_test (
    NAME TEXT NOT NULL
    , slug TEXT UNIQUE
  );

  CREATE TRIGGER trg_generate_slug_for_test
    BEFORE INSERT OR UPDATE
    ON _slug_test
    FOR EACH ROW
      EXECUTE PROCEDURE util.generate_slug_on_name();

  PREPARE insert_name (TEXT) AS
    INSERT INTO _slug_test (NAME)
    VALUES($1)
    RETURNING slug;

  SELECT results_eq(
    $$ EXECUTE insert_name('UPPERCASE slug test') $$,
    $$ VALUES('uppercase-slug-test-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'UPPERCASE slug test'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('   trim SLUG     from     both sides test  ') $$,
    $$ VALUES('trim-slug-from-both-sides-test-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    '   trim SLUG     from     both sides test  '
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('slug with strange !@#$%^&*()_+{}[] symbols') $$,
    $$ VALUES('slug-with-strange-^-_-]-symbols-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'slug with strange !@#$%^&*()_+{}[] symbols'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('testing slug with unicode ♠♥♦♣ символи') $$,
    $$ VALUES('testing-slug-with-unicode-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'testing slug with unicode ♠♥♦♣ символи'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('♠♥♦♣ само непозволени за СЛЪГ символи !@#$%&*()+{}') $$,
    $$ VALUES(util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'only disallowed symbols in name'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('♠♥♦♣ само полу непозволени за СЛЪГ символи !@#$%^&*()_+{}[]') $$,
    $$ VALUES('^-_-]-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'should be valid in url / slugify'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('generating slug for duplicate names') $$,
    $$ VALUES('generating-slug-for-duplicate-names-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'first `slug` should not end with `--[0-9]+`'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('generating slug for duplicate names') $$,
    $$ VALUES('generating-slug-for-duplicate-names-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'second `slug` for same `name` should end with unique shortcode'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('generating slug for duplicate names') $$,
    $$ VALUES('generating-slug-for-duplicate-names-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'third `slug` for same `name` should end with unique shortcode'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('test slug after updating name') $$,
    $$ VALUES('test-slug-after-updating-name-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    '`slug` for `old-name`'
    );

  -- TG_OP = insert / do not change slug
  SELECT results_eq(
    $$ EXECUTE insert_name('ouch! My name is changed!') $$,
    $$ VALUES('ouch-my-name-is-changed-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    '`slug` for `new-name`'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('ouch! My name is changed!') $$,
    $$ VALUES('ouch-my-name-is-changed-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'next `slug` for `new-name`'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('test slug after updating name') $$,
    $$ VALUES('test-slug-after-updating-name-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    '`slug` for `old-name` here we have duplicated `slug`'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('test slug after updating name') $$,
    $$ VALUES('test-slug-after-updating-name-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'next `slug` for `old-name`'
    );

  SELECT results_eq(
    $$ EXECUTE insert_name('test slug after updating name') $$,
    $$ VALUES('test-slug-after-updating-name-' || util.hashid_encode(currval('util.slug_uniqueness_sequence'), 3)) $$,
    'next `slug` for `old-name`'
    );

  SELECT finish();

ROLLBACK;
