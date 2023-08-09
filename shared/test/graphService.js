import request from 'supertest'

/*
 * Wrapper function to all graphQL test requests
 */
test.graphService = () => {
  return request(test.variables.GRAPHQL_API_URL).post(test.variables.GRAPHQL_API_ENDPOINT)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
}

/*
 * Attach Authorization header
 */
request.Test.prototype.authorize = function (user) {
  if (typeof user.jwtToken !== 'string') {
    throw new TypeError(`The user must be given as an object taken from login() mutation`)
  }

  return this.set('Authorization', `Bearer ${user.jwtToken}`)
}


/*
 * Async function to login as test user
 */
test.loginAs = async (credentials, include_api_key = false) => {
  let loggedUser
  if (credentials.email != undefined && credentials.password != undefined) {
    loggedUser = await test.graphService()
      .send({
        query: `mutation Login($payload: LoginInputRecordInput!) {
                  login(input: { payload: $payload }) {
                    jwtToken
                  }
                }`,
        variables: {
          payload: credentials
        }
      })
      .then( r => {
        return r.body.data.login
      })

    loggedUser.me = await test.graphService()
      .authorize(loggedUser)
      .send({
        query: `query {
                  me
                }`,
      })
      .then( r => {
        return r.body.data.me
      })

    if (include_api_key) {
      loggedUser.api_key = await test.graphService()
        .authorize(loggedUser)
        .send({
          query: `mutation createApiKey {
                    createApiKey(input: {payload: {description: "test api key"}}) {
                      createApiKeyResult {
                        id
                        apiKey
                        userId
                        description
                        expireAt
                        createdAt
                      }
                    }
                  }`,
        })
        .then( r => {
          return r.body.data.createApiKey.createApiKeyResult.apiKey
        })
    }
    return loggedUser
  } else {
    throw new Error(`Cannot login with provided credentials. ${email}, ${password}`);
  }
}


/*
 * Async function to login with all test user
 */
test.loginTestUsers = async (include_api_key = false) => {
  let users = []

  users['test_single_member'] = await test.loginAs(test.credentials.test_single_member, include_api_key)
  users['test_provider'] = await test.loginAs(test.credentials.test_provider, include_api_key)
  users['test_provider_premium'] = await test.loginAs(test.credentials.test_provider_premium, include_api_key)
  users['test_super_admin'] = await test.loginAs(test.credentials.test_super_admin, include_api_key)

  return users
}
