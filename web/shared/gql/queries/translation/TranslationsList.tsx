import gql from 'graphql-tag'

export default gql`
  query TranslationsList($lang: String!) {
    translations: translationsList(condition: { lang: $lang }) {
      lang
      namespace
      key
      translation
    }
  }
`
