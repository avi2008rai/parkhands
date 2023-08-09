import React, { useRef } from 'react'
import { FormContext, useForm } from 'react-hook-form'
import { Box, Grid, Typography } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import useStyles from 'components/auth/authStyles'
import { useUserContext } from 'components/hooks/useUserContext'
import ActionDialog, { ActionDialogProps } from 'components/common/ActionDialog'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'
import ChangePasswordForm, {
  currentPasswordSchema,
  formOptions,
} from 'components/auth/password/form/ChangePasswordForm'

type ChangePasswordDialogProps = Pick<
  ActionDialogProps,
  'open' | 'onClose' | 'disableEscapeKeyDown' | 'disableBackdropClick' | 'closeToDashboard'
> & {
  onPasswordChanged?: () => void
}
export default function ChangePasswordDialog({
  onPasswordChanged,
  ...props
}: ChangePasswordDialogProps) {
  const classes = useStyles()
  const t = useDomain(Domain.Pages)
  const { currentUser } = useUserContext()

  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm({
    ...formOptions,
    validationSchema: currentPasswordSchema,
  })
  const {
    formState: { isSubmitting },
  } = methods

  return (
    <ActionDialog flex headerLabel="change_password" maxWidth="xs" {...props}>
      <Box flexGrow={12} px={3} py={3} my={5} display="flex" alignItems="center">
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Typography>{t('label_new_password')}</Typography>
          </Grid>
          <Grid item>
            <FormContext {...methods}>
              <ChangePasswordForm
                formRef={formRef}
                email={currentUser?.email}
                requireCurrentPassword
                onPasswordChanged={onPasswordChanged}
              />
            </FormContext>
          </Grid>
        </Grid>
      </Box>
      <DialogFormSubmitButton
        formRef={formRef}
        loading={isSubmitting}
        label="change_password"
        color="secondary"
      />
    </ActionDialog>
  )
}
