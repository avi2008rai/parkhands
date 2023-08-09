import slotGqlrepo from './slot.gqlrepo'

import moment from 'moment'

describe('Slot Booking Attendance', () => {
  let users = {}
  let bookings = {}
  let driverBookings = {
    pending: null,
    canceled: null,
  }

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Check booking attendance on demand', () => {
    describe('Validation', () => {
      it('anonymous', done => {
        test
          .graphService()
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: '85aba4d7-8c79-40f9-94b8-89ff389cb3fe',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal(
              'permission denied for function slot_booking_attend',
            )
          })
      })

      it('get all bookings', done => {
        test
          .graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: slotGqlrepo.queries.list_bookings,
          })
          .expect(200, done)
          .expect(r => {
            bookings = r.body.data.slotBookings.nodes

            driverBookings = {
              pending: bookings.find(({ userId, status }) => {
                return userId === users['test_single_member'].me.id && status === 'PENDING'
              }),
              canceled: bookings.find(({ userId, status }) => {
                return userId === users['test_single_member'].me.id && status === 'CANCELED'
              }),
            }
          })
      })

      it('attendance type  not set', done => {
        const booking = driverBookings.pending
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: booking.id,
                time: new Date(),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal('attend_type_not_set')
          })
      })

      it('time not set', done => {
        const booking = driverBookings.pending
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: booking.id,
                attendanceType: 'CHECKIN',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal('attend_time_not_set')
          })
      })

      it('time before the booking start', done => {
        const booking = driverBookings.pending
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: booking.id,
                attendanceType: 'CHECKIN',
                time: moment(booking.startTime).subtract(30, 'minutes'),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal('attend_before_booking_start')
          })
      })

      it('checkin after the booking end', done => {
        const booking = driverBookings.pending
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: booking.id,
                attendanceType: 'CHECKIN',
                time: moment(booking.endTime).add(30, 'minutes'),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal('checkin_after_booking_end')
          })
      })

      it('attend cancelled booking', done => {
        const booking = driverBookings.canceled
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: booking.id,
                attendanceType: 'CHECKIN',
                time: moment(booking.startTime).add(30, 'minutes'),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal('booking_canceled')
          })
      })

      it('checkout without checkin', done => {
        const booking = driverBookings.pending
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.bookingAttendance,
            variables: {
              payload: {
                slotBookingId: booking.id,
                attendanceType: 'CHECKOUT',
                time: moment(booking.startTime).add(30, 'minutes'),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].message.should.equal('checkout_without_checkin')
          })
      })
    })
  })

  describe('Success', () => {
    it('check in', done => {
      const booking = driverBookings.pending
      test
        .graphService()
        .authorize(users['test_single_member'])
        .send({
          query: slotGqlrepo.mutations.bookingAttendance,
          variables: {
            payload: {
              slotBookingId: booking.id,
              attendanceType: 'CHECKIN',
              time: moment(booking.startTime).add(30, 'minutes'),
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.slotBookingAttend.slotBooking.checkInAt.should.equal(
            moment(booking.startTime)
              .add(30, 'minutes')
              .toJSON()
              .replace('.000Z', '+00:00'),
          )
          should(r.body.data.slotBookingAttend.slotBooking.checkOutAt).equal(null)
        })
    })

    it('check out', done => {
      const booking = driverBookings.pending
      test
        .graphService()
        .authorize(users['test_single_member'])
        .send({
          query: slotGqlrepo.mutations.bookingAttendance,
          variables: {
            payload: {
              slotBookingId: booking.id,
              attendanceType: 'CHECKOUT',
              time: moment(booking.startTime).add(30, 'minutes'),
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          should(r.body.data.slotBookingAttend.slotBooking.checkOutAt).equal(
            moment(booking.startTime)
              .add(30, 'minutes')
              .toJSON()
              .replace('.000Z', '+00:00'),
          )
        })
    })

    it('check in after check out', done => {
      const booking = driverBookings.pending
      test
        .graphService()
        .authorize(users['test_single_member'])
        .send({
          query: slotGqlrepo.mutations.bookingAttendance,
          variables: {
            payload: {
              slotBookingId: booking.id,
              attendanceType: 'CHECKIN',
              time: moment(booking.startTime).add(45, 'minutes'),
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.slotBookingAttend.slotBooking.checkInAt.should.equal(
            moment(booking.startTime)
              .add(45, 'minutes')
              .toJSON()
              .replace('.000Z', '+00:00'),
          )
          // `checkOutAt` should be null after we do a second checkin
          should(r.body.data.slotBookingAttend.slotBooking.checkOutAt).equal(null)
        })
    })
  })
})
