import _ from 'lodash'
import React from 'react'
import { Switch } from '@material-ui/core'

import { StatusT, useUpdateUserMutation } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'

export default function StatusSwitch({
  id,
  status,
  onChange,
}: {
  id: string
  status: StatusT
  onChange: (value: string) => void
}) {
  const { user } = useUser()
  const [updateUser, { loading }] = useUpdateUserMutation()
  const checked = status === StatusT.Enabled
  const toggleStatus: StatusT = checked ? StatusT.Disabled : StatusT.Enabled
  return (
    <Switch
      value={id}
      color="primary"
      disabled={loading || id === user.id}
      checked={checked}
      onChange={async () => {
        const response = await updateUser({
          variables: {
            payload: {
              id,
              status: toggleStatus,
            },
          },
        })
        onChange(response?.data?.updateUser?.user?.status as string)
      }}
    />
  )
}
