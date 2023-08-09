import _ from 'lodash'
import React from 'react'
import { MenuItem, TextField, SelectProps, Typography } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { useUsersListQuery } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function OwnerIdController() {
  const { userId } = useUser()
  const { errors, control, setValue } = useFormContext()
  const { data: users } = useUsersListQuery({ fetchPolicy: 'cache-and-network' })
  const { t } = useTranslation(Domain.General)

  return (
    <div>
      <Controller
        name="ownerId"
        control={control}
        type="hidden"
        defaultValue={userId}
        InputProps={{
          readOnly: true,
          hidden: true,
        }}
        as={<TextField />}
      />
    </div>
  )
}
