import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { useListAmenitiesQuery } from 'gql/schema'

export default function AmenitiesField() {
  const { control, watch } = useFormContext()
  const { data: amenitiesData } = useListAmenitiesQuery({ fetchPolicy: 'cache-first' })
  const { t } = useTranslation(Domain.Amenities)

  const amenities = watch('amenities')

  return (
    <Grid container justify="space-between" alignItems="center" alignContent="center">
      {_.map(amenitiesData?.amenitiesList, (amenity) => (
        <Grid item key={amenity.id} md={4} xs={6}>
          <FormControlLabel
            label={t(amenity.name)}
            control={
              <Controller
                as={<Checkbox />}
                control={control}
                checked={!!amenities[amenity.id]}
                name={`amenities[${amenity.id}]`}
                onChange={([, /* skip arg event */ checked]) => checked && amenity.id}
              />
            }
          />
        </Grid>
      ))}
      {_.map(amenitiesData?.categoriesList, (amenity) => (
        <Grid item key={amenity.id} md={4} xs={6}>
          <FormControlLabel
            label={t(amenity.name)}
            control={
              <Controller
                as={<Checkbox />}
                control={control}
                checked={!!amenities[amenity.id]}
                name={`amenities[${amenity.id}]`}
                onChange={([, /* skip arg event */ checked]) => checked && amenity.id}
              />
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}
