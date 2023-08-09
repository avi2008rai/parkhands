import React, { useState, useEffect } from 'react'
import DatePickerController from 'components/common/form/controller/DatePickerController'

export default function TempUnavailableField({ name, label, tempDate, defaultDate }: any) {
  const [selectedDate, setSelectedDate] = useState(null)

  const showDate = (date: any) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (tempDate) {
      setSelectedDate(defaultDate)
    }
  }, [])

  return (
    <DatePickerController
      name={name}
      label={label}
      dateValue={selectedDate}
      onChangemethod={showDate}
    />
  )
}
