import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'

import { FormControl, FormHelperText, InputLabel } from '@material-ui/core'
import { Domain } from 'common/i18n/locale'
import { Controller, useFormContext } from 'react-hook-form'
import { MenuItem, Select, SelectProps } from '@material-ui/core'

import { AccessRestrictions } from 'gql/schema'

export default function AccessRestrictionsController() {
  const { t } = useTranslation(Domain.General)
  const { errors, control } = useFormContext()
  const accessRestrictionsList = AccessRestrictions

  return (
    <FormControl fullWidth>
      <InputLabel margin="dense" id="category-type-label" variant="outlined">
        {t('Access restriction')}
      </InputLabel>
      <Controller
        name="accessRestrictions"
        control={control}
        size="small"
        variant="outlined"
        label={t('Access restriction')}
        as={
          <Select variant="outlined" margin="dense">
            {_.map(Object.values(accessRestrictionsList), (accessRestriction, key) => (
              <MenuItem key={key} value={accessRestriction}>
                {accessRestriction.charAt(0).toUpperCase() + accessRestriction.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  )
}
