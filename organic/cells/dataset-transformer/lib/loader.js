import fs from 'fs'
const validFileTypes = ['js']

const requireFiles = (directory, ...args) => {
  fs.readdirSync(directory).forEach((fileName) => {
    // Recursive directory load
    if (fs.lstatSync(directory + '/' + fileName).isDirectory()) {
      requireFiles(directory + '/' + fileName, ...args)
    } else {
      // Skip unknown filetypes
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return

      // Require the file.
      const file = directory + '/' + fileName
      //console.log(`| mounting file | ${file}`)
      const module = require(file)
      if (module.default) {
        module.default(...args) // ES6
      } else {
        module(...args)
      }
    }
  })
}

module.exports = requireFiles
