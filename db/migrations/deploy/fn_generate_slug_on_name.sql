-- Deploy PH:fn_generate_slug_on_name to pg
-- requires: schema_util

BEGIN;

  CREATE OR REPLACE FUNCTION util.generate_slug_on_name()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
  AS $FUNCTION$
    DECLARE
    _existing_slug_count BIGINT;
    _new_slug TEXT;
  BEGIN

    IF (TG_OP = 'INSERT') THEN

      -- Handle passing slug from CMS
      IF NEW.slug IS NOT NULL THEN
        RETURN NEW;
      END IF;

      -- Slugify new.name
      SELECT * FROM util.slugify(NEW.NAME) INTO _new_slug;

      IF _new_slug = '' THEN
        _new_slug := util.hashid_encode(nextval('util.slug_uniqueness_sequence'), 3);
      ELSE
        _new_slug := _new_slug || '-' || util.hashid_encode(nextval('util.slug_uniqueness_sequence'), 3);
      END IF;

      -- Assign generated slug to object
      NEW.slug := _new_slug;

    END IF;

    RETURN NEW;

  END;
  $FUNCTION$;

  REVOKE ALL PRIVILEGES ON FUNCTION util.generate_slug_on_name() FROM PUBLIC;

COMMIT;
