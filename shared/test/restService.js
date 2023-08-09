import request from 'supertest'

/*
 * Wrapper function to all REST test requests
 */
test.restService = (method, url) => {
  return request(test.variables.REST_API_URL)[method](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
}
