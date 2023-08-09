import React from 'react'
import { Typography } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import PageDialog from 'components/common/PageDialog'

import ParkingSpaceForm, { ParkingSpaceFormProps } from './ParkingSpaceForm'

type VehicleDialogProps = {
  open: boolean
  onClose?: () => void
} & Pick<ParkingSpaceFormProps, 'onCreate'>

export default function ParkingSpaceDialog({ open, onClose, onCreate }: VehicleDialogProps) {
  const t = useDomain(Domain.Pages)
  return (
    <PageDialog open={open} onClose={onClose}>
      <Typography variant="h3" paragraph>
        {t('add_new_parking_space')}
      </Typography>
      <ParkingSpaceForm onCreate={onCreate} />
    </PageDialog>
  )
}
