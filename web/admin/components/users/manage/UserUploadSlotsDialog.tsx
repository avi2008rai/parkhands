import _ from 'lodash'
import React, { useCallback, useState, useMemo } from 'react'
import {
  useMediaQuery,
  Dialog,
  Button,
  Input,
  CircularProgress,
  Box,
  Grid,
  Typography,
  Theme,
} from '@material-ui/core'

import { useUserContext } from 'components/hooks/useUserContext'
import useFormError from 'components/common/hooks/useFormError'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

type WizardSlotDialogProps = {
  userId: string
  open: boolean
  onClose?: () => void
  onSuccess?: () => void
}
export default function UserUploadSlotsDialog({
  userId,
  open,
  onClose,
  onSuccess,
}: WizardSlotDialogProps) {
  const fullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const closeModal = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose()
    }
  }, [onClose])

  const { jwtToken } = useUserContext()
  const headers = useMemo(() => ({ Authorization: `Bearer ${jwtToken}` }), [jwtToken])

  const { FormFooter, FormError, setError, resetError } = useFormError()
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
      body.append('ownerId', userId)
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
    [setUploadPending],
  )

  const { t } = useTranslation(Domain.Slots)

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      disableEscapeKeyDown
      onClose={closeModal}
      fullScreen={fullScreen}>
      <Box p={2}>
        <Grid direction="column" container spacing={3}>
          <Grid item>
            <Typography variant="subtitle1" align="center">
              {t('upload_csv', { ns: Domain.Slots })}
            </Typography>
          </Grid>
          <Grid item>
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
                  'Browse CSV file'
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
          </Grid>
          {numberOfRecords > 0 && (
            <Grid item>
              <Typography align="center">
                Imported {numberOfRecords} slot{numberOfRecords > 1 && 's'}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <FormFooter
              submit
              submitProps={{ label: 'OK', onClick: closeModal }}
              cancel
              cancelProps={{ onClick: closeModal }}>
              <FormError />
            </FormFooter>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
