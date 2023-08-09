module.exports = {
  queries: {
    list: {
      all: `
        query {
          translationsList(orderBy: TRANSLATION_ASC) {
            key
            lang
            translation
            namespace
          }
        }`,
      all_admin: `
        query {
          translationsList(orderBy: TRANSLATION_ASC) {
            id
            key
            lang
            translation
            namespace
          }
        }`,
      deutsch_only: `
        query {
          translationsList(orderBy: KEY_ASC, condition: {lang: "de"}) {
            key
            lang
            translation
            namespace
          }
        }`,
      english_only: `
        query {
          translationsList(orderBy: KEY_ASC, condition: {lang: "en"}) {
            key
            lang
            translation
            namespace
          }
        }`
    }
  },
  mutations: {
    create: `
      mutation createTranslation($translation: TranslationInput!) {
        createTranslation(input: { translation: $translation }) {
          translation {
            key
            lang
            translation
            namespace
          }
        }
      }`,
    update: `
      mutation updateTranslation($id: UUID!, $patch: TranslationPatch!) {
        updateTranslation(input: { id: $id, patch: $patch }) {
          translation {
            key
            lang
            translation
            namespace
          }
        }
      }`,
    delete: `
      mutation deleteTranslation($id: UUID!) {
        deleteTranslation(input: { id: $id }) {
          translation { id }
        }
      }`
  },

  variables: {
    en1: {
      translation: {
        key: 'homepage_greeting_common'
        , lang: 'en'
        , translation: 'should_be_in_en'
        , namespace: 'homepage'
      }
    },
    de1: {
      translation: {
        key: 'homepage_greeting_common'
        , lang: 'de'
        , translation: 'should_be_in_de'
        , namespace: 'homepage'
      }
    },
  }
}
