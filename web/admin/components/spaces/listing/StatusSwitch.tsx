import React from 'react'
import { Switch } from '@material-ui/core'

import { ParkingSpaceStatus,  useUpdateParkingSpaceMutation } from 'gql/schema'

export default function StatusSwitch({
  id,
  status,
  onChange,
}: {
  id: string
  status: ParkingSpaceStatus
  onChange: (value: string) => void
}) {
  const [updateSPace, { loading }] = useUpdateParkingSpaceMutation()
  const checked = status === ParkingSpaceStatus.Enabled
  const toggleStatus: ParkingSpaceStatus = checked ? ParkingSpaceStatus.Disabled : ParkingSpaceStatus.Enabled
  return (
    <Switch
      value={id}
      color="secondary"
      disabled={loading}
      checked={checked}
      onChange={async () => {
        const response = await updateSPace({
          variables: {
            id,
            patch: {
              status: toggleStatus,
            },
          },
        })
        onChange(response?.data?.updateParkingSpace?.parkingSpace?.status as string)
      }}
    />
  )
}
