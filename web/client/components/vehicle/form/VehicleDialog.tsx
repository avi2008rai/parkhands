import React from 'react'
import { Typography } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import PageDialog from 'components/common/PageDialog'

import VehicleForm, { VehicleFormProps } from './VehicleForm'

type VehicleDialogProps = {
  open: boolean
  onClose?: () => void
} & Pick<VehicleFormProps, 'onCreate'>

export default function VehicleDialog({ open, onClose, onCreate }: VehicleDialogProps) {
  const t = useDomain(Domain.Pages)
  return (
    <PageDialog open={open} onClose={onClose}>
      <Typography variant="h3" paragraph>
        {t('create_vehicle')}
      </Typography>
      <VehicleForm direction="column" onCreate={onCreate} disableDeletion />
    </PageDialog>
  )
}
