import _ from 'lodash'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import GeoSearchBox, { GeoSearchBoxProps } from 'components/search/GeoSearchBox'

const useStyles = makeStyles((theme) => ({ addressInput: { marginBottom: theme.spacing(2) } }))

export default function LocationPickerMapSearchBox({
  onPlacesChanged,
  bounds,
}: {
  onPlacesChanged: GeoSearchBoxProps['onPlacesChanged']
  bounds?: google.maps.LatLngBounds
}) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)

  return (
    <GeoSearchBox
      bounds={bounds}
      onPlacesChanged={onPlacesChanged}
      searchInput={
        <TextField
          className={classes.addressInput}
          placeholder={t("Search")}
          autoComplete="off"
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          fullWidth
          variant="outlined"
        />
      }
    />
  )
}
