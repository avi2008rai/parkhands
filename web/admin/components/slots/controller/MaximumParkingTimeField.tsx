import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'
import { FormControl } from '@material-ui/core'
import { Domain } from 'common/i18n/locale'
import MaximumParkingTimeController from './MaximumParkingTimeController'
export default function MaximumParkingTimeField() {
  const { t } = useTranslation(Domain.General)
  const [timerList, setTimerList] = useState<string[]>([])
  useEffect(() => {
    const hours = []
    const minutesList: string[] = ['00', '15', '30', '45']
    const timerArray: any[] = []
    for (let count = 0; count <= 23; count++) {
      hours.push(count > 9 ? '' + count : '0' + count)
    }
    hours.forEach((hour) => {
      minutesList.forEach((min) => {
        if (hour + ':' + min !== '00:00') timerArray.push(hour + ':' + min)
      })
    })
    setTimerList(timerArray)
  }, [])
  return (
    <FormControl>
      <MaximumParkingTimeController timeList={timerList} />
    </FormControl>
  )
}
