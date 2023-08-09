import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import { Select, MenuItem, SelectProps } from '@material-ui/core'

import { systemRoles } from 'common/roles'
import { Domain } from 'common/i18n/locale'

export default function RoleController({ label = 'Role' }: Pick<SelectProps, 'label'>) {
  const { errors, control } = useFormContext()
  const { t } = useTranslation(Domain.User)
  return (
    <Controller
      name="role"
      margin="dense"
      control={control}
      label={label}
      error={Boolean(errors.role)}
      as={
        <Select>
          {_.map(systemRoles, (role) => (
            <MenuItem key={role.name} value={role.name}>
              {t(role.label)}
            </MenuItem>
          ))}
        </Select>
      }
    />
  )
}
