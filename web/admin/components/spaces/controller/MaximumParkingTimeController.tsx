import { useTranslation } from 'react-i18next'
import _, { forEach } from 'lodash'
import React, { useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { MenuItem, Select, SelectProps } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import { useSet } from 'react-use'

export default function MaximumParkingTimeController({ timeList }: any) {
  const { t } = useTranslation(Domain.General)
  const { errors, control } = useFormContext()
  // const [maxParkingTimer, setMaxParkingTimer] = useState('01:00')

  return (
    <Controller
      name="maximumParkingTime"
      control={control}
      as={
        <Select variant="outlined" margin="dense">
          {_.map(timeList, (timer, id) => (
            <MenuItem key={id} value={timer}>
              {timer}
            </MenuItem>
          ))}
        </Select>
      }
    />
  )
}
