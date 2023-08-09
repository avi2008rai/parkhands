import path from 'path'
const _ = require('lodash')

import { queries } from './slot.gqlrepo'

describe('CRUD - api.slot_bookings', () => {
  let users = {}
  let translations = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('anonymous', () => {
    it('list-all', done => {
      test
        .graphService()
        .send({ query: queries.list_bookings })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('42501')
        })
    })
  })

  describe('base_single', () => {
    it('list-all', done => {
      test
        .graphService()
        .authorize(users['test_single_member'])
        .send({ query: queries.list_bookings })
        .expect(200, done)
        .expect(r => {
          // result is based on test_data scripts
          r.body.data.slotBookings.nodes.length.should.equal(4)
          _.each(r.body.data.slotBookings.nodes, booking => {
            booking.userId.should.be.oneOf([
              users['test_single_member'].me.id,
              users['test_super_admin'].me.id,
            ])
            booking.phone.should.be.oneOf(['+49111111111', '+35911111111', '+49444444444'])
            booking.status.should.be.oneOf(['PENDING', 'CANCELED'])
          })
          // Validate booking phone numbers
        })
    })

    it('list-ongoing-bookings', done => {
      test
        .graphService()
        .authorize(users['test_single_member'])
        .send({
          query: queries.list_ongoing_bookings,
          variables: { time: new Date(), ownerId: users['test_single_member'].me.id },
        })
        .expect(200, done)
        .expect(r => {
          // result is based on test_data scripts
          const slotsWithOngoingBooking = _.filter(r.body.data.slotsList, slot => {
            return !_.isEmpty(slot.slotBookingsList)
          })
          slotsWithOngoingBooking.length.should.equal(1)
          slotsWithOngoingBooking[0].slotBookingsList.length.should.equal(1)
          slotsWithOngoingBooking[0].slotBookingsList[0].user.id.should.equal(
            users['test_super_admin'].me.id,
          )
        })
    })
  })

  describe('app_super_admin', () => {
    it('list-all', done => {
      test
        .graphService()
        .authorize(users['test_super_admin'])
        .send({ query: queries.list_bookings })
        .expect(200, done)
        .expect(r => {
          r.body.data.slotBookings.nodes.length.should.equal(7)
        })
    })
  })
})
