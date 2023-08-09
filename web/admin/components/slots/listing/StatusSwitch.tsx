import React from 'react'
import { Switch } from '@material-ui/core'

import { SlotStatusT, useUpdateSlotMutation } from 'gql/schema'

export default function StatusSwitch({
  id,
  status,
  onChange,
}: {
  id: string
  status: SlotStatusT
  onChange: (value: string) => void
}) {
  const [updateSlot, { loading }] = useUpdateSlotMutation()
  const checked = status === SlotStatusT.Enabled
  const toggleStatus: SlotStatusT = checked ? SlotStatusT.Disabled : SlotStatusT.Enabled
  return (
    <Switch
      value={id}
      color="secondary"
      disabled={loading}
      checked={checked}
      onChange={async () => {
        const response = await updateSlot({
          variables: {
            id,
            patch: {
              status: toggleStatus,
            },
          },
        })
        onChange(response?.data?.updateSlot?.slot?.status as string)
      }}
    />
  )
}
