import React from 'react'
import { Switch } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { StatusT } from 'gql/schema'

export default function StatusController() {
  const { control, watch } = useFormContext()
  const status = watch('status')
  const checked = status === StatusT.Enabled
  return (
    <Controller
      as={<Switch checked={checked} />}
      name="status"
      control={control}
      onChange={([, /* skip arg event */ selected]) =>
        selected ? StatusT.Enabled : StatusT.Disabled
      }
    />
  )
}
