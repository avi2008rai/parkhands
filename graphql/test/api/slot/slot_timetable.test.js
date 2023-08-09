const moment = require('moment')

describe('Slot Timetable', () => {
  let users = {},
    slots = [],
    queries = {}

  let timetableStartTime = moment('2020-05-29 09:00:00')
  let timetableEndTime = moment('2020-05-29 11:00:00')

  queries['list-all-slots'] = `
    query {
      slotsList(orderBy: NAME_ASC) {
        id
        name
      }
    }
  `

  queries['get-slot-timetable'] = `
    query slotTimetable($slotIds: [UUID], $timetableStartTime: Datetime, $timetableEndTime: Datetime){
      slotTimetableList(slotIds: $slotIds
                      , timetableStartTime: $timetableStartTime
                      , timetableEndTime: $timetableEndTime) {
        slotId
        startTime
        endTime
        timetableDate
        dayOfWeek
        booked
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

  describe('Get slot timetable', () => {
    describe('anonymous', () => {
      it('Get timetable for 1 slot that is free', done => {
        test.graphService()
          .send({
            query: queries['get-slot-timetable'],
            variables: {
              slotIds: [slots[0].id],
              timetableStartTime: timetableStartTime.format(),
              timetableEndTime: timetableEndTime.format(),
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotTimetableList.length.should.equal(24)
            r.body.data.slotTimetableList[0].slotId.should.equal(slots[0].id)
            r.body.data.slotTimetableList[0].booked.should.equal(false)
            r.body.data.slotTimetableList[0].timetableDate.should.equal(
              timetableStartTime.format('YYYY-MM-DD'),
            )
            r.body.data.slotTimetableList[0].dayOfWeek.should.equal(timetableStartTime.days())
            let spanStartTime = moment(r.body.data.slotTimetableList[0].startTime)
            let spanEndTime = moment(r.body.data.slotTimetableList[0].endTime)
            spanStartTime.hour().should.equal(9)
            spanStartTime.minutes().should.equal(0)
            spanEndTime.hour().should.equal(9)
            spanEndTime.minutes().should.equal(5)
          })
      })

      it('Get timetable for 1 slot that is booked in 1st hour', done => {
        test.graphService()
          .send({
            query: queries['get-slot-timetable'],
            variables: {
              slotIds: [slots[5].id],
              timetableStartTime: timetableStartTime.format(),
              timetableEndTime: timetableEndTime.format(),
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotTimetableList.length.should.equal(24)
            r.body.data.slotTimetableList[0].slotId.should.equal(slots[5].id)
            r.body.data.slotTimetableList[0].booked.should.equal(true)
            r.body.data.slotTimetableList[0].timetableDate.should.equal(
              timetableStartTime.format('YYYY-MM-DD'),
            )
            r.body.data.slotTimetableList[0].dayOfWeek.should.equal(timetableStartTime.days())
            let spanStartTime = moment(r.body.data.slotTimetableList[0].startTime)
            let spanEndTime = moment(r.body.data.slotTimetableList[0].endTime)
            spanStartTime.hour().should.equal(9)
            spanStartTime.minutes().should.equal(0)
            spanEndTime.hour().should.equal(9)
            spanEndTime.minutes().should.equal(5)
          })
      })

      it('Get timetable for 2 slots', done => {
        test.graphService()
          .send({
            query: queries['get-slot-timetable'],
            variables: {
              slotIds: [slots[0].id, slots[5].id],
              timetableStartTime: timetableStartTime.format(),
              timetableEndTime: timetableEndTime.format(),
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotTimetableList.length.should.equal(48)
          })
      })
    })
  })
})
