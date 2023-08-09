import _ from 'lodash'
import React, { useCallback } from 'react'
import { useMediaQuery, Dialog, Theme } from '@material-ui/core'

import WizardSlotForm from 'components/slots/form/wizard/WizardSlotForm'
import { WizardProvider, useFormWizard } from 'components/hooks/useFormWizard'

export { WizardProvider }

type WizardSlotDialogProps = {
  open: boolean
  onClose?: () => void
  onSuccess?: () => void
}
export default function WizardSlotDialog({ open, onClose, onSuccess }: WizardSlotDialogProps) {
  const { reset } = useFormWizard()
  const fullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const closeModal = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose()
    }
    reset()
  }, [onClose, reset])

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      disableEscapeKeyDown
      disableBackdropClick
      onClose={closeModal}
      fullScreen={fullScreen}>
      <WizardSlotForm onFormSuccess={closeModal} onCreateSuccess={onSuccess} onClose={closeModal} />
    </Dialog>
  )
}
