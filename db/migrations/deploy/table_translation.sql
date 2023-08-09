-- Deploy PH:table_translation to pg

BEGIN;

  CREATE TABLE api.translation (
    id                UUID PRIMARY KEY
                      CONSTRAINT translation_pkey
                      DEFAULT uuid_generate_v4(),
    key               CITEXT NOT NULL,
    lang              CHAR(2) NOT NULL
                      REFERENCES api.language(code),
    translation       TEXT NOT NULL,
    namespace         CITEXT,
    created_at        TIMESTAMPTZ NOT NULL
                      DEFAULT now(),
    updated_at        TIMESTAMPTZ
  );

  CREATE UNIQUE INDEX translation_unique_idx
    ON api.translation (key, lang);

  CREATE INDEX translation_namespace_idx
    ON api.translation (namespace, lang);

  CREATE TRIGGER trg_translation_set_updated_at
    BEFORE UPDATE
    ON api.translation
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

COMMIT;
