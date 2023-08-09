describe('CRUD - Files', () => {
  let users = []
  const tmpFilePath = `/tmp/testfile.jpg`
  let fileInStorage

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  before('Download image URL', (done) => {
    // Dependencies
    var fs = require('fs')
    var url = require('url')
    var exec = require('child_process').exec

    // App variables
    var file_url = 'http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg'
    var DOWNLOAD_DIR = '/tmp/'

    // Function for downloading file using wget
    var download_file_wget = function(file_url) {
      // extract the file name
      var file_name = url.parse(file_url).pathname.split('/').pop()
      // compose the wget command
      var wget = 'wget ' + file_url + ' -O ' + tmpFilePath
      // excute wget using child_process' exec function

      var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR)
        done()
      })
    }

    download_file_wget(file_url)
  })

  describe('UPLOAD', () => {
    it('try to upload image as anonymous', (done) => {
      test.fileService('post', `/files`)
        .attach('file', tmpFilePath)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('upload image as single_member', (done) => {
      test.fileService('post', `/files`)
        .authorize(users['test_single_member'])
        .attach('file', tmpFilePath)
        .expect(200, done)
        .expect(r => {
          r.body.filename.should.exist
          fileInStorage = r.body.filename
        })
    })
  })

  describe('LIST', () => {
    it('try to list all as anonymous', (done) => {
      test.fileService('get', `/files`)
        .expect(401, done)
    })

    it('list all as single_member', (done) => {
      test.fileService('get', `/files`)
        .authorize(users['test_single_member'])
        .expect(200, done)
        .expect(r => {
          r.body.length.should.be.above(0);
        })
    })
  })

  describe('GET', () => {
    it('try to get image as anonymous', (done) => {
      test.fileService('get', `/files/${fileInStorage}`)
        .expect(401, done)
    })

    it('get image as single_member', (done) => {
      test.fileService('get', `/files/${fileInStorage}`)
        .authorize(users['test_single_member'])
        .expect(200, done)
        .expect(r => {
          r.body.should.not.be.empty()
        })
    })
  })

  describe('DELETE', () => {
    it('try to delete image as anonymous', (done) => {
      test.fileService('delete', `/files/${fileInStorage}`)
        .expect(401, done)
    })

    it('delete image as single_member', (done) => {
      test.fileService('delete', `/files/${fileInStorage}`)
        .authorize(users['test_single_member'])
        .expect(200, done)
    })
  })
})
