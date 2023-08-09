const fs = require('fs')
const path = require('path')
const hjson = require('hjson')

const mergeDNA = (dnaPath, dna) => {
  const filenames = fs.readdirSync(dnaPath, 'utf8')
  const hjsons = filenames.filter(filename => filename.includes('hjson'))
  hjsons.forEach(filename => {
    const content = hjson.parse(fs.readFileSync(path.join(dnaPath, filename), 'utf8'))
    Object.assign(dna, content)
  })
}

module.exports.load = () => {
  let dna = {}

  // load default DNA
  mergeDNA(`${process.cwd()}/dna/`, dna)
  // load specific DNA for the corresponding CELL and override default if applicable
  mergeDNA(`${process.cwd()}/dna/${process.env.CELL_MODE || 'development'}`, dna)
  return dna
}
