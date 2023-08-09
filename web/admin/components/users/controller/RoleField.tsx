import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { InputLabel, FormHelperText } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

import RoleController from './RoleController'

export default function RoleField({ label = 'Role' }: { label?: string }) {
  const { t } = useTranslation(Domain.User)
  const { errors } = useFormContext()
  return (
    <>
      <InputLabel>{t(label)}</InputLabel>
      <RoleController label={t(label)} />
      <FormHelperText variant="outlined" error={Boolean(errors.role?.message)}>
        {errors.role?.message}
      </FormHelperText>
    </>
  )
}
