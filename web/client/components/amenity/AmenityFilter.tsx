import _ from 'lodash'
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { useListAmenitiesQuery, ListAmenitiesQuery, PickArrayType } from 'gql/schema'
import { useFilters } from 'components/hooks/useFilters'

const useStyles = makeStyles((theme) =>
  createStyles({
    radioGroup: {
      flexDirection: 'row',
    },
    amenityGrid: {
      '& .MuiTypography-root': {
        fontSize: theme.typography.pxToRem(10),
      },
    },
  }),
)

const FILTER_ALL = '__ALL__'

type Amenity = PickArrayType<ListAmenitiesQuery['amenitiesList']>
type AmenitiesStorage = {
  [key: string]: boolean
}
type CategoryStorage = {
  [key: string]: boolean
}
export default function AmenityFilter() {
  const classes = useStyles()
  const {
    filterAmenities,
    setFilterAmenities,
    filterCategories,
    setFilterCategories,
  } = useFilters()
  const [amenities, setAmenities] = useState<AmenitiesStorage>({})
  const [categories, setCategories] = useState<CategoryStorage>({})
  const { data: amenitiesData } = useListAmenitiesQuery({ fetchPolicy: 'cache-first' })
  const { t } = useTranslation(Domain.Amenities)

  useEffect(() => {
    if (amenitiesData) {
      if (amenitiesData.amenitiesList) {
        setAmenities(
          _.reduce(
            amenitiesData.amenitiesList,
            (result, amenity) => {
              result[amenity.id] = _.includes(filterAmenities, amenity.id)
              return result
            },
            {} as AmenitiesStorage,
          ),
        )
      }

      if (amenitiesData.categoriesList) {
        setCategories(
          _.reduce(
            amenitiesData.categoriesList,
            (result, category) => {
              result[category.id] = _.includes(filterCategories, category.id)
              return result
            },
            {} as CategoryStorage,
          ),
        )
      }
    }
  }, [amenitiesData, filterAmenities, filterCategories])

  const changeCategory = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCategories({
        ...categories,
        [event?.target.value]: event?.target.checked,
      })
      setFilterCategories(event.target.value === FILTER_ALL ? [] : [event.target.value])
    },
    [amenities],
  )

  const changeAmenity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAmenities({
        ...amenities,
        [event?.target.name]: event?.target.checked,
      })
      setFilterAmenities(_.xor(filterAmenities, [event.target.name]))
    },
    [filterAmenities],
  )

  return (
    <Grid container direction="column" spacing={0}>
      {/* <pre>
        {JSON.stringify({ amenities, filterAmenities, categories, filterCategories }, null, 2)}
      </pre> */}
      <Grid item>
        <Typography variant="subtitle1" paragraph>
          {t('Category')}
        </Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          name="category"
          defaultValue={FILTER_ALL}
          className={classes.radioGroup}
          onChange={changeCategory}>
          {_.map(amenitiesData?.categoriesList, (amenity: Amenity) => (
            <FormControl component="fieldset" key={amenity.id}>
              <FormControlLabel
                label={<Typography variant="subtitle2">{t(amenity.name)}</Typography>}
                control={<Radio size="small" value={amenity.id} />}
              />
            </FormControl>
          ))}
          <FormControl component="fieldset">
            <FormControlLabel
              label={<Typography variant="subtitle2">{t('All')}</Typography>}
              control={<Radio size="small" value={FILTER_ALL} />}
            />
          </FormControl>
        </RadioGroup>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" paragraph>
          {t('amenities')}
        </Typography>
      </Grid>
      <Grid container direction="row" spacing={0} className={classes.amenityGrid}>
        {_.map(amenitiesData?.amenitiesList, (amenity: Amenity) => (
          <Grid item xs={4} key={amenity.id}>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  label={<Typography variant="subtitle2">{t(amenity.name)}</Typography>}
                  control={
                    <Checkbox
                      size="small"
                      name={amenity.id}
                      checked={amenities[amenity.id] || false}
                      onChange={changeAmenity}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
