const util = require('util')

test.plog = function(obj, hint = 'Object') {
  console.log(`\r\n <<<<<< Start: ${hint} ------ \r\n`)
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  )
  console.log(`\r\n ------ End: ${hint} >>>>>> \r\n`)
}
