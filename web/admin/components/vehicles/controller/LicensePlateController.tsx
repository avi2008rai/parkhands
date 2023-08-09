import React from 'react'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import TextFieldController from 'components/common/form/controller/TextFieldController'

export default function LicensePlateController() {
  const { t } = useTranslation(Domain.Bookings)
  return <TextFieldController name="licensePlate" label={t('license_plate')} />
}
