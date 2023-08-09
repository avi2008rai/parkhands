import { map } from 'lodash'
import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'

import { Domain, useDomain } from 'common/i18n'

import { countryList } from './countryList'

export default function CountryField({ label = 'select_country', ...props }: TextFieldProps) {
  const t = useDomain(Domain.Forms)
  return (
    <TextField
      select
      fullWidth
      size="small"
      variant="outlined"
      SelectProps={{ native: true }}
      label={typeof label === 'string' ? t(label) : label}
      {...props}>
      <option value="" disabled></option>
      {map(countryList, (country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </TextField>
  )
}
