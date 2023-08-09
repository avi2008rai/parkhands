import React from 'react'
import { Switch } from '@material-ui/core'

import { StatusT, useUpdateVehicleMutation } from 'gql/schema'

export default function StatusSwitch({
  id,
  status,
  onChange,
}: {
  id: string
  status: StatusT
  onChange: (value: string) => void
}) {
  const [updateVehicle, { loading }] = useUpdateVehicleMutation()
  const checked = status === StatusT.Enabled
  const toggleStatus: StatusT = checked ? StatusT.Disabled : StatusT.Enabled
  return (
    <Switch
      value={id}
      color="primary"
      disabled={loading}
      checked={checked}
      onChange={async () => {
        const response = await updateVehicle({
          variables: {
            id,
            patch: {
              status: toggleStatus,
            },
          },
        })
        onChange(response?.data?.updateVehicle?.vehicle?.status as string)
      }}
    />
  )
}
