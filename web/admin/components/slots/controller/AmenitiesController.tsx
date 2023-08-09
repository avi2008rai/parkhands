import React from 'react'
import _ from 'lodash'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useFormContext } from 'react-hook-form'
import { ListAmenitiesQuery, Slot, ManageSlotQuery,SlotAmenity } from 'gql/schema'
import { Domain } from 'common/i18n/locale'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
    
  }),
)

type Amenities = { [key: string]: string }

type AmenitiesQuery = { amenitiesData?: ListAmenitiesQuery , slotAmenitiesList?: { amenityId: string; }[] }

export default function Tags({ amenitiesData , slotAmenitiesList }: AmenitiesQuery) {
  const { t } = useTranslation(Domain.Amenities)
  const classes = useStyles()
  const { setValue } = useFormContext()
  const amenitiesList = (selectedValue: any) => {
    let amenitiesSelectedList: Amenities = {}
    selectedValue.map((value: any) => {
      amenitiesSelectedList[value.id] = value.id
    })
    setValue('amenities', amenitiesSelectedList)
  }

  const setAmenitiesDefaultValue = () => {
    const defaultAmenities = amenitiesData?.amenitiesList?.filter((amenities:any) => {
      let avaialbe = false

      slotAmenitiesList?.map((slotAmenities: any) => {

        if (amenities.id === slotAmenities.amenityId) {
          avaialbe = true
          return true
        }
      })
      return avaialbe
    })
    return defaultAmenities
  }

  return (
    <div className={classes.root}>
      {amenitiesData?.amenitiesList && (
        <Autocomplete
          multiple
          id="amenities"
          limitTags={2}
          size="small"
          options={amenitiesData.amenitiesList}
          onChange={(event, value) => amenitiesList(value)}
          getOptionLabel={(options) => t(options.name)}
          defaultValue={setAmenitiesDefaultValue()}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              label="Amenities"
              placeholder="Start typing amenitiy type"
            />
          )}
        />
      )}
    </div>
  )
}