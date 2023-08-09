import _ from 'lodash'
import React, { useCallback, useState, useMemo } from 'react'
import {
  useMediaQuery,
  Dialog,
  Button,
  Input,
  CircularProgress,
  Typography,
  Theme,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import routes from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import useFormError from 'components/hooks/useFormError'
import { useUserContext } from 'components/hooks/useUserContext'
import SlotWizardStep from 'components/slots/form/wizard/SlotWizardStep'
import { WizardProvider, useFormWizard } from 'components/hooks/useFormWizard'
import SlotWizardHeader from 'components/slots/form/wizard/SlotWizardHeader'

export { WizardProvider }

type WizardSlotDialogProps = {
  open: boolean
  onClose?: () => void
  onSuccess?: () => void
}
export default function UploadSlotDialog({ open, onClose, onSuccess }: WizardSlotDialogProps) {
  const { t } = useTranslation(Domain.Forms)
  const { next, reset } = useFormWizard()
  const fullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const closeModal = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose()
    }
    reset()
  }, [onClose, reset])

  const { jwtToken } = useUserContext()
  const headers = useMemo(() => ({ Authorization: `Bearer ${jwtToken}` }), [jwtToken])

  const { FormError, setError, resetError } = useFormError()
  const [uploadPending, setUploadPending] = useState(false)
  const [numberOfRecords, setNumberOfRecords] = useState(0)
  const onPickFileHandler = useCallback(
    async (event) => {
      resetError()
      // No file is selected
      const selectedFile = _.get(event, 'target.files[0]')
      if (!selectedFile) return

      // Prepare file to be uploaded
      setUploadPending(true)
      const body = new FormData()
      body.append('file', selectedFile)

      try {
        // Upload file
        const response = await fetch('/api/slots/upload', { method: 'POST', body, headers })
        const result = await response.json()
        console.log({ result })

        if (response.status === 200) {
          if (result.imported) {
            setNumberOfRecords(result.imported.length)
          }
          if (typeof onSuccess === 'function') {
            onSuccess()
          }
          next()
        } else {
          throw new Error(result.message)
        }
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setUploadPending(false)
      }
    },
    [setUploadPending, next],
  )

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      disableEscapeKeyDown
      onClose={closeModal}
      fullScreen={fullScreen}>
      <SlotWizardHeader title="upload_csv" onClose={closeModal} />
      <SlotWizardStep
        index={0}
        title={uploadPending ? 'uploading' : 'select_your_file'}
        fields={<FormError />}
        button={
          <label htmlFor="csvFile" style={{ display: 'block' }}>
            <Button
              fullWidth
              color="primary"
              component="span"
              variant="contained"
              disabled={uploadPending}>
              {uploadPending ? (
                <CircularProgress color="secondary" size="1.5rem" />
              ) : (
                t('browse_csv_file')
              )}
            </Button>
            <Input
              style={{ display: 'none' }}
              id="csvFile"
              type="file"
              name="csvFile"
              onChange={onPickFileHandler}
              inputProps={{ accept: '.csv, text/csv, application/csv' }}
            />
          </label>
        }
      />
      <SlotWizardStep
        index={1}
        title="upload_completed"
        fields={
          <Typography align="center">{t('imported_slot', { count: numberOfRecords })}</Typography>
        }
        button={
          <LinkButton
            {...routes.slots.index}
            fullWidth
            color="primary"
            variant="contained"
            onClick={closeModal}>
            {t('continue')}
          </LinkButton>
        }
      />
    </Dialog>
  )
}
