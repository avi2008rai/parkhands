const path = require('path')
global.$require = function (p) {
  return require(path.join(process.cwd(), `/${p}`))
}
