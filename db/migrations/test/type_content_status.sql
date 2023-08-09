BEGIN;

  SELECT	  plan(2);

  SELECT has_enum('public'::NAME, 'content_status_t'::NAME);

  SELECT enum_has_labels(
    'content_status_t'::NAME
    , ARRAY[
      'published'
      , 'draft'
      ]
  );

  SELECT	  finish();

ROLLBACK;
