import { GraphQLClient } from 'graphql-request'
const dna = require('config')

const graphQLRequest = async (req, query, variables = {}) => {
  const endpoint = dna.get('graphql.apiUrl') + dna.get('graphql.apiEndpoint')

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: ( req.headers.authorization ? { authorization: req.headers.authorization } : {} ),
  })

  return await graphQLClient.request(query, variables)
}

module.exports = graphQLRequest
