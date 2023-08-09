import path from 'path'
const _ = require('lodash')
const moment = require('moment')

import gqlrepo from './slot.gqlrepo'
import vehicleSizeGqlrepo from '../vehicle/size/vehicle_size.gqlrepo'

describe('Slot - api.bookSlot', () => {
  let users = {}
  let slots = []
  let avails = []
  let vehicle_sizes = []
  let today = moment()
  const minutes = (5 * Math.round( today.minute() / 5 )) % 60
  today = today.startOf('hour').add(minutes, "minutes").startOf('minute').toDate()
  const tmrw = moment(today).add(1, 'days').toDate()
  const ahead2 = moment(today).add(2, 'days').toDate()

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Prepare test records', () => {
    it('Get all vehicle_sizes', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({ query: vehicleSizeGqlrepo.queries.list.all })
        .expect(200, done)
        .expect(r => {
          vehicle_sizes = r.body.data.vehicleSizesList
        })
    })

    it('Add slot for test use', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.create,
          variables: gqlrepo.variables.slot.create_slot_no_amenities(users['test_single_member'], vehicle_sizes[0].id)
        })
        .expect(200, done)
        .expect(r => {
          slots['sloty'] = r.body.data.createSlot.slot
        })
    })

    it('Add slot with default timezone', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.create,
          variables: gqlrepo.variables.slot.create_slot_w_timezone(
            users['test_single_member'],
            vehicle_sizes[0].id
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createSlot.slot.timezone.should.exists
          r.body.data.createSlot.slot.timezone.should.equal('Europe/Berlin')
          slots['sloty_tz'] = r.body.data.createSlot.slot
        })
    })

    it('Add slot with timezone', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.create,
          variables: gqlrepo.variables.slot.create_slot_w_timezone(
            users['test_single_member'],
            vehicle_sizes[0].id,
            'Europe/Sofia'
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createSlot.slot.timezone.should.exists
          r.body.data.createSlot.slot.timezone.should.equal('Europe/Sofia')
          slots['sloty_tz'] = r.body.data.createSlot.slot
        })
    })

    it('Add disabled slot for test use', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.create,
          variables: gqlrepo.variables.slot.create_slot_no_amenities(users['test_single_member'], vehicle_sizes[0].id, 'DISABLED')
        })
        .expect(200, done)
        .expect(r => {
          slots['disabled'] = r.body.data.createSlot.slot
        })
    })

    it('Create availability for test slot today', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.availability.create,
          variables: gqlrepo.variables.availability.create_12_18(slots['sloty'], today.getDay())
        })
        .expect(200, done)
        .expect(r => {
          avails['sloty_today'] = r.body.data.createSlotAvailability.slotAvailability
        })
    })

    it('Create availability for test slot Tomorrow', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.availability.create,
          variables: gqlrepo.variables.availability.create_12_18(slots['sloty'], tmrw.getDay())
        })
        .expect(200, done)
        .expect(r => {
          avails['sloty_tmrw'] = r.body.data.createSlotAvailability.slotAvailability
        })
    })

    it('Create availability for test slot The day after tmrw', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.availability.create,
          variables: gqlrepo.variables.availability.create_12_18(slots['sloty'], ahead2.getDay())
        })
        .expect(200, done)
        .expect(r => {
          avails['sloty_2_day_ahead'] = r.body.data.createSlotAvailability.slotAvailability
        })
    })
  })

  describe('anonymous', () => {
    it('Try to execute', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member'],
            slots['sloty'],
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
        })
    })
  })

  describe('test_single_member', () => {
    it('Try to Book a slot outside WH', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , new Date(tmrw.setHours(4))
            , new Date(tmrw.setHours(9))
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('SU409')
          r.body.errors[0].message.should.equal('slot_unavailable_outside_wh')
        })
    })

    it('Try to Book a slot with only end_time within boundries', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , new Date(tmrw.setHours(8))
            , new Date(tmrw.setHours(16))
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('SU409')
          r.body.errors[0].message.should.equal('slot_unavailable_outside_wh')
        })
    })

    it('Try to Book a slot with only start_time within boundries', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , new Date((new Date()).setHours(16))
            , new Date((new Date()).setHours(22))
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('SU409')
          r.body.errors[0].message.should.equal('slot_unavailable_outside_wh')
        })
    })

    it('Book a slot for 2 hours', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , new Date(tmrw.setHours(13))
            , new Date(tmrw.setHours(15))
          )
        })
        .expect(200, done)
        .expect(r => {
          let obj = r.body.data.bookSlot.slotBooking
          obj.slotId.should.equal(slots['sloty'].id)
          obj.userId.should.equal(users['test_single_member'].me.id)
          obj.licensePlate.should.equal('GG 3333 GG')
          obj.phone.should.equal('+49111111111')
        })
    })

    it('Try to Book a slot for 2 hours / same hours', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , new Date(tmrw.setHours(13))
            , new Date(tmrw.setHours(15))
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('SB409')
          r.body.errors[0].message.should.equal('slot_unavailable_already_booked')
        })
    })

    it('Try Book a slot for 2 hours / one week back', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , moment(today).hours(13).subtract(7, 'days').toDate()
            , moment(today).hours(15).subtract(7, 'days').toDate()
          )
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('ST409')
          r.body.errors[0].message.should.equal('slot_unavailable_back_in_time')
        })
    })

    it('Try Book a slot for another user / returns currentUser booked slot', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_super_admin']
            , slots['sloty']
            , new Date(ahead2.setHours(13))
            , new Date(ahead2.setHours(15))
          )
        })
        .expect(200, done)
        .expect(r => {
          //should not be changed to the admins id
          r.body.data.bookSlot.slotBooking.userId.should.equal(users['test_single_member'].me.id)
        })
    })

    it('Book a slot for 2 hours a week ahead', (done) => {
      let start_time = moment(today).hours(13).add(7, 'days').toDate()
      let end_time = moment(today).hours(15).add(7, 'days').toDate()
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , start_time
            , end_time
          )
        })
        .expect(200, done)
        .expect(r => {
          let obj = r.body.data.bookSlot.slotBooking
          obj.slotId.should.equal(slots['sloty'].id)
          obj.userId.should.equal(users['test_single_member'].me.id)
          let isStartTimeOk = moment(obj.startTime).isSame(moment(start_time))
          isStartTimeOk.should.equals(true)
          obj.licensePlate.should.equal('GG 3333 GG')
          obj.phone.should.equal('+49111111111')
        })
    })

    describe('Active Booking', () => {

      it('Check active booking input params', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.active_booking,
            variables: gqlrepo.variables.active_booking.interval(null)
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].code.should.equal('AB001')
            r.body.errors[0].message.should.equal('invalid_interval')
          })
      })

      it('Check active booking', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.active_booking,
            variables: gqlrepo.variables.active_booking.start_interval(
              new Date(tmrw.setHours(13)),
              { hours: 1 }
            )
          })
          .expect(200, done)
          .expect(r => {
            const obj = r.body.data.activeBooking
            obj.slotId.should.equal(slots['sloty'].id)
            obj.userId.should.equal(users['test_single_member'].me.id)
            obj.licensePlate.should.equal('GG 3333 GG')
          })
      })

      it('Check active booking in schedule', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.active_booking,
            variables: gqlrepo.variables.active_booking.interval({ hours: 24 + 13 }) // Tomorrow + 13 hours
          })
          .expect(200, done)
          .expect(r => {
            const obj = r.body.data.activeBooking
            obj.slotId.should.equal(slots['sloty'].id)
            obj.userId.should.equal(users['test_single_member'].me.id)
            obj.licensePlate.should.equal('GG 3333 GG')
          })
      })

      it('Check active booking prior schedule', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.active_booking,
            variables: gqlrepo.variables.active_booking.start_interval(
              new Date(tmrw.setHours(11)),
              { hours: 1, minutes: 30 }
            )
          })
          .expect(200, done)
          .expect(r => {
            should(r.body.data.activeBooking).equal(null)
          })
      })

      it('Check active booking after schedule', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.active_booking,
            variables: gqlrepo.variables.active_booking.start_interval(
              new Date(tmrw.setHours(15)),
              { minutes: 30 }
            )
          })
          .expect(200, done)
          .expect(r => {
            should(r.body.data.activeBooking).equal(null)
          })
      })

      it('Check active booking ahead of time', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.active_booking,
            variables: gqlrepo.variables.active_booking.start_interval(
              ahead2,
              { hours: 2 } // 2 days + 2 hours
            )
          })
          .expect(200, done)
          .expect(r => {
            should(r.body.data.activeBooking).equal(null)
          })
      })

    }) // Active booking END

    describe('Disabled Slot', () => {
      it('Try to Book ', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.book_slot_exec,
            variables: gqlrepo.variables.book.book_slot_1(
              users['test_super_admin']
              , slots['disabled']
              , moment(today).hours(13).toDate()
              , moment(today).hours(15).toDate()
            )
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].code.should.equal('SD409')
            r.body.errors[0].message.should.equal('slot_unavailable_disabled')
          })
      })
    })
  })

  describe('test_super_admin', () => {
    it('Books a slot for app_single_member', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.mutations.book_slot_exec,
          variables: gqlrepo.variables.book.book_slot_1(
            users['test_single_member']
            , slots['sloty']
            , moment(today).hours(13).add(8, 'days').toDate()
            , moment(today).hours(15).add(8, 'days').toDate()
          )
        })
        .expect(200, done)
        .expect(r => {
          let obj = r.body.data.bookSlot.slotBooking
          obj.slotId.should.equal(slots['sloty'].id)
          obj.userId.should.equal(users['test_single_member'].me.id)
          obj.licensePlate.should.equal('GG 3333 GG')
          obj.phone.should.equal('+49111111111')
        })
    })
  })
})
