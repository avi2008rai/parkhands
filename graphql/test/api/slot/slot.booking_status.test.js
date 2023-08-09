import slotGqlrepo from './slot.gqlrepo'

import moment from 'moment'

describe('Slot - Current booking status', () => {
  let users = {}
  let testSlotIds = {
    available: '8a45abd7-8c79-40f9-94b8-899cb3ff38fe',
    unavailable: '9a6b9c44-2221-49a0-bd5f-0eefcd3f8f4e',
    status_disabled: 'b815a5ba-24d6-4346-a335-cc23a6441509'
  }

  let startTime = new Date()
  let endTime = new Date()

  let today = moment()
  const minutes = (5 * Math.round( today.minute() / 5 )) % 60
  today = today.startOf('hour').add(minutes, "minutes").startOf('minute').toDate()
  const tmrw = moment(today).add(1, 'days').toDate()

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Check booking status on demand', () => {
    describe('Corrupted payload', () => {
      describe('no slot', () => {
        it('call fn without slotId', (done) => {
          test.graphService()
            .send({
              query: slotGqlrepo.queries.slot_booking_status,
              variables: {
                payload: {
                  startTime,
                  endTime,
                }
              }
            })
            .expect(200, done)
            .expect(r => {
              r.body.errors[0].message.should.equal('missing_payload_params')
            })
        })

        it('call fn without start/endTime', (done) => {
          test.graphService()
            .send({
              query: slotGqlrepo.queries.slot_booking_status,
              variables: {
                payload: {
                  slotId: testSlotIds.available,
                }
              }
            })
            .expect(200, done)
            .expect(r => {
              r.body.errors[0].message.should.equal('missing_payload_params')
            })
        })

        it('call fn without slotId', (done) => {
          test.graphService()
            .send({
              query: slotGqlrepo.queries.slot_booking_status,
              variables: {
                payload: {
                  startTime
                }
              }
            })
            .expect(200, done)
            .expect(r => {
              r.body.errors[0].message.should.equal('missing_payload_params')
            })
        })
      })
    })

    describe('available today', () => {
      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.available,
                startTime,
                endTime,
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('AVAILABLE')
          })
      })
    })

    describe('unavailable today', () => {
      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.unavailable,
                startTime,
                endTime,
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('UNAVAILABLE')
          })
      })
    })

    describe('available tomorrow', () => {
      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.available,
                startTime: new Date(tmrw.setHours(16)),
                endTime: new Date(tmrw.setHours(19))
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('AVAILABLE')
          })
      })
    })

    describe('unavailable tomorrow', () => {
      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.unavailable,
                startTime: new Date(tmrw.setHours(16)),
                endTime: new Date(tmrw.setHours(19))
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('UNAVAILABLE')
          })
      })
    })

    describe('availability search with timezone', () => {
      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.available,
                startTime: '2020-09-22T09:00:00.000Z,', // This is Slot in London e.g. time is 10-11 local time.
                endTime: '2020-09-22T10:00:00.000Z,'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('AVAILABLE')
          })
      })
    })

    describe('booked', () => {
      it('Book a slot for 3 hours tmrw', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: slotGqlrepo.mutations.book_slot_exec,
            variables: slotGqlrepo.variables.book.book_slot_1(
              users['test_single_member']
              , { id: testSlotIds.available }
              , new Date(tmrw.setHours(16))
              , new Date(tmrw.setHours(19))
            )
          })
          .expect(200, done)
          .expect(r => {
            let obj = r.body.data.bookSlot.slotBooking
            obj.slotId.should.equal(testSlotIds.available)
            obj.userId.should.equal(users['test_single_member'].me.id)
            obj.licensePlate.should.equal('GG 3333 GG')
            obj.phone.should.equal('+49111111111')
          })
      })

      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.available,
                startTime: new Date(tmrw.setHours(18)),
                endTime: new Date(tmrw.setHours(20)),
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('BOOKED')
          })
      })
    })

    describe('unavailable status:disabled', () => {
      it('call fn', (done) => {
        test.graphService()
          .send({
            query: slotGqlrepo.queries.slot_booking_status,
            variables: {
              payload: {
                slotId: testSlotIds.status_disabled,
                startTime: new Date(),
                endTime: new Date()
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingStatus.should.equal('UNAVAILABLE')
          })
      })
    })
  })
})
