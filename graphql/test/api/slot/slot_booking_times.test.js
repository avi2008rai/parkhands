const moment = require('moment')

describe('Slot Booking Times', () => {
  let users = {},
    slots = [],
    queries = {}

  let startTime = moment('2020-05-29 00:00:00')
  let endTime = moment('2020-05-30 00:00:00')

  queries['list-all-slots'] = `
    query {
      slotsList(orderBy: NAME_ASC) {
        id
        name
      }
    }
  `

  queries['get-slot-booking-times'] = `
    query slotBookingTimesList($payload: SlotBookingTimesInputRecordInput) {
      slotBookingTimesList(payload: $payload) {
        slotId
        startTime
        endTime
      }
    }
  `

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Prepare use cases', () => {
    it('Get all test slots', done => {
      test.graphService()
        .send({
          query: queries['list-all-slots'],
        })
        .expect(200, done)
        .expect(r => {
          slots = r.body.data.slotsList
          slots.length.should.equal(10)
        })
    })
  })

  describe('Get slot booking times', () => {
    describe('anonymous', () => {
      it('Get booking times for 1 slot', done => {
        test.graphService()
          .send({
            query: queries['get-slot-booking-times'],
            variables: {
              payload: {
                slotIds: [slots[6].id],
                startTime: startTime.format(),
                endTime: endTime.format(),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingTimesList.length.should.equal(3)
            r.body.data.slotBookingTimesList[0].slotId.should.equal(slots[6].id)
          })
      })

      it('Get booking times for 2 slots', done => {
        test.graphService()
          .send({
            query: queries['get-slot-booking-times'],
            variables: {
              payload: {
                slotIds: [slots[5].id, slots[6].id],
                startTime: startTime.format(),
                endTime: endTime.format(),
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotBookingTimesList.length.should.equal(5)
          })
      })
    })
  })
})
