import React from 'react'
import { Switch } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

export default function RadioController() {
  const { control, watch } = useFormContext()
  return (
    <Controller
      as={<Switch checked={true} />}
      name="tempUnavailable"
      control={control}
      onChange={([, /* skip arg event */ selected]) =>
        selected ? true : false
      }
    />
  )
}
