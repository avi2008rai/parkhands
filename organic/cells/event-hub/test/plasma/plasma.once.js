let plasma = test.plasma

describe('plasma once feature', function() {
  it('check plasma events', function(done) {
    plasma.once('c1', function(c) {
      c.type.should.equal('c1')
      plasma.once('c1', function(c) {
        c.type.should.equal('c1')
        done()
      })
      plasma.emit({ type: 'c1' })
    })
    plasma.emit({ type: 'c1' })
  })
})
