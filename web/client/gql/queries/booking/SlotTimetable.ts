import gql from 'graphql-tag'

export default gql`
  query SlotTimetable($slotId: UUID!, $startTime: Datetime, $endTime: Datetime) {
    slotTimetableList(
      slotIds: [$slotId]
      timetableStartTime: $startTime
      timetableEndTime: $endTime
    ) {
      slotId
      startTime
      endTime
      booked
      timetableDate
      dayOfWeek
    }
  }
`
