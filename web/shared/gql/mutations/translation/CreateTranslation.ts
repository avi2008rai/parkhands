import gql from 'graphql-tag'

// {
//   "payload": {
//     "translationString": {
//       "key":"Dashboard",
//       "namespace":"general",
//       "lang":"de",
//       "translation":"Hauptpanel"
//     }
//   }
// }

export default gql`
  mutation CreateTranslation($payload: CreateTranslationInput!) {
    createTranslation(input: $payload) {
      translation {
        key
      }
    }
  }
`
