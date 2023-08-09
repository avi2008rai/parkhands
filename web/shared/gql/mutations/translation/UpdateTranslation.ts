import gql from 'graphql-tag'

// {
//   "payload": {
//     "key":"Dashboard",
//     "patch":{
//       "key":"Dashboard",
//       "namespace":"general",
//       "lang":"de",
//       "translation":"Hauptpanel"
//     }
//   }
// }

export default gql`
  mutation UpdateTranslation($payload: UpdateTranslationInput!) {
    updateTranslation(input: $payload) {
      translation {
        key
        translation
      }
    }
  }
`
