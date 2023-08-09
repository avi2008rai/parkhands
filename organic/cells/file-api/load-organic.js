import './lib/require'

import loader from 'lib/loader'
import Plasma from 'organic-plasma'

const Cell = function Cell() {
  this.plasma = new Plasma()
  loader(`${process.cwd()}/organelles`, { plasma: this.plasma })
}

export default Cell
