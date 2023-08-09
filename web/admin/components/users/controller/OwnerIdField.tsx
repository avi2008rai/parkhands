import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { InputLabel, FormHelperText } from '@material-ui/core'
// import { SelectProps } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

import OwnerIdController from './OwnerIdController'

export default function OwnerIdField() {
  return <OwnerIdController />
}
