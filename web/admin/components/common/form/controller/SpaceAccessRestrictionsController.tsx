import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'

import { FormControl, FormHelperText, InputLabel } from '@material-ui/core'
import { Domain } from 'common/i18n/locale'
import { Controller, useFormContext } from 'react-hook-form'
import { MenuItem, Select, SelectProps } from '@material-ui/core'

import { SpaceAccessRestriction } from 'gql/schema'

export default function SpaceAccessRestrictionsController() {
  const { t } = useTranslation(Domain.General)
  const { errors, control } = useFormContext()
  const accessRestrictionsList = SpaceAccessRestriction

  return (
    <FormControl fullWidth>
      <InputLabel margin="dense" id="category-type-label" variant="outlined">
      {t("access_restriction")}
      </InputLabel>
      <Controller
        name="accessRestriction"
        control={control}
        size="small"
        variant="outlined"
        label={t("access_restriction")}
        
        as={
          <Select variant="outlined" margin="dense" multiple>
            {_.map(Object.values(accessRestrictionsList), (accessRestriction, key) => (
              <MenuItem key={key} value={accessRestriction}>
                
                {t(accessRestriction.charAt(0).toUpperCase() + accessRestriction.slice(1).toLowerCase())}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  )
}
