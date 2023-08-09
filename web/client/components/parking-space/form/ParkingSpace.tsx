import _ from 'lodash'
import React, { useState, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MenuItem, Typography, TextField, TextFieldProps } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import { useMyParkingSpacesListQuery } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'

import ParkingSpaceDialog from './ParkingSpaceDialog'

export default function VehicleLicensePlate({ label = 'parking_space', ...props }: TextFieldProps) {
  const { t } = useTranslation(Domain.Forms)
  const { userId } = useUser()
  const { data: parkingSpaces, refetch } = useMyParkingSpacesListQuery({
    variables: { ownerId: userId },
    fetchPolicy: 'cache-and-network',
  })
  const [open, setOpen] = useState(false)
  const { setValue } = useFormContext()
  const translatedLabel = useMemo(() => {
    if (typeof label === 'string') {
      return t(label)
    }
    return label
  }, [label])

  return (
    <>
      <TextField
        select
        fullWidth
        variant="outlined"
        margin="dense"
        label={translatedLabel}
        {...props}>
        <MenuItem disabled>
          <Typography variant="subtitle2">
            <em>{translatedLabel}</em>
          </Typography>
        </MenuItem>
        <MenuItem value="">
          <Typography variant="subtitle2">{t('no_result_found')}</Typography>
        </MenuItem>
        {_.map(parkingSpaces?.parkingSpacesList, (parkingSpace) => {
          if (!parkingSpace?.id) {
            return null
          }
          return (
            <MenuItem key={parkingSpace.id} value={parkingSpace.id}>
              {parkingSpace.name}
            </MenuItem>
          )
        })}
        <MenuItem value="" onClick={() => setOpen(true)}>
          {t('add_new_parking_space')}
        </MenuItem>
      </TextField>
      <ParkingSpaceDialog
        open={open}
        onCreate={async (parkingSpace) => {
          await refetch()
          if (props.name) {
            setValue(props.name, parkingSpace)
          }
          setOpen(false)
        }}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
