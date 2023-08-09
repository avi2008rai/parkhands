import _ from 'lodash'
import React, { useState } from 'react'
import { CloudUpload } from '@material-ui/icons'
import { Typography, Button } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import UploadSlotDialog, { WizardProvider } from 'components/slots/form/upload/UploadSlotDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      boxShadow: '3px 3px 10px #151E2680',
      borderRadius: theme.shape.borderRadius,
      height: '7rem',
      padding: theme.spacing(4),
    },
    title: {
      paddingLeft: theme.spacing(1),
    },
    icon: {
      borderRadius: '50%',
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
    },
  }),
)

type CreateSlotButtonProps = {
  onSuccess?: () => void
}
export default function UploadSlotsButton({ onSuccess }: CreateSlotButtonProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <WizardProvider steps={1}>
      <Button
        fullWidth
        color="secondary"
        startIcon={<CloudUpload />}
        focusRipple
        className={classes.root}
        classes={{ startIcon: classes.icon }}
        onClick={() => setModalOpen(true)}>
        <Typography variant="subtitle1" className={classes.title}>
          {t('upload_csv')}
        </Typography>
      </Button>
      <UploadSlotDialog
        open={modalOpen}
        onSuccess={onSuccess}
        onClose={() => setModalOpen(false)}
      />
    </WizardProvider>
  )
}
