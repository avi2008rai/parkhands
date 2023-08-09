import { useTranslation } from 'react-i18next'
import _, { forEach } from 'lodash'
import React, { useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { MenuItem, Select, SelectProps, InputLabel, FormControl } from '@material-ui/core'
import { Domain } from 'common/i18n/locale'
import { useSet } from 'react-use'
export default function MaximumParkingTimeController({ timeList }: any) {
  const { t } = useTranslation([Domain.General, Domain.Slots])
  const { errors, control } = useFormContext()
  // const [maxParkingTimer, setMaxParkingTimer] = useState('01:00')
  return (
    <FormControl fullWidth>
      <InputLabel margin="dense" id="category-type-label" variant="outlined">
        {t('max_parking_time', {ns: Domain.Slots} )}
      </InputLabel>
      <Controller
        name="maximumParkingTime"
        control={control}
        variant="outlined"
        label={t('max_parking_time', {ns: Domain.Slots})}
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
    </FormControl>
  )
}
