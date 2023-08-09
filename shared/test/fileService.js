import request from 'supertest'

/*
 * Wrapper function to all file test requests
 */
test.fileService = (method, url) => {
  return request(test.variables.FILE_API_URL)[method](url)
    .set('Accept', 'application/json')
}
