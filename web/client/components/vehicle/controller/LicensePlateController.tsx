import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextFieldProps } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import TextFieldController from 'components/form/controller/TextFieldController'

export default function LicensePlateController(props: TextFieldProps) {
  const { t } = useTranslation(Domain.Pages)
  return <TextFieldController name="licensePlate" label={t('License Plate')} {...props} />
}
