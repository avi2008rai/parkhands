import React from 'react'
import { Typography, Box } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import useStyles from 'components/auth/authStyles'
import ActionDialog, { ActionDialogProps } from 'components/common/ActionDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'
import CheckmarkIcon from 'components/common/icon/CheckmarkIcon'

type WishToParkSuccessProps = {
  onClose: () => void
} & ActionDialogProps

export default function WishToParkSuccess({ onClose, ...props }: WishToParkSuccessProps) {
  const classes = useStyles()
  const t = useDomain(Domain.Forms)

  return (
    <ActionDialog
      flex
      maxWidth="xs"
      closeModalButtonProps={{ style: { display: 'none' } }}
      {...props}>
      <Box
        flexGrow={6}
        px={3}
        my={5}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end">
        <Box>
          <Typography variant="h3">{t('message_thankyou')}</Typography>
        </Box>
      </Box>
      <Box flexGrow={6} px={3} mb={5}>
        <div style={{ minHeight: '20vh' }}>
          <CheckmarkIcon className={classes.checkmark} color="secondary" />
        </div>
      </Box>
      <DialogSubmitButton label="close" color="secondary" onClick={onClose} />
    </ActionDialog>
  )
}
