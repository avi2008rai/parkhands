import React from 'react'
import { Switch } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { ParkingSpaceStatus } from 'gql/schema'

export default function SpaceStatusController() {
  const { control, watch } = useFormContext()
  const status = watch('status')
  const checked = status === ParkingSpaceStatus.Enabled
  return (
    <Controller
      as={<Switch checked={checked} />}
      name="status"
      control={control}
      onChange={([, /* skip arg event */ selected]) =>
        selected ? ParkingSpaceStatus.Enabled : ParkingSpaceStatus.Disabled
      }
    />
  )
}
