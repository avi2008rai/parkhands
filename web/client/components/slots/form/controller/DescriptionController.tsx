import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'

export default function DescriptionController(props: TextFieldProps) {
  const { errors, control } = useFormContext()

  const { t } = useTranslation(Domain.Forms)
  
  return (
    <Controller
      multiline
      rows="4"
      size="small"
      variant="outlined"
      name="description"
      label={t("Description")}
      control={control}
      error={Boolean(errors.description)}
      helperText={errors.description?.message}
      as={<TextField {...props} />}
    />
  )
}
