import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { FormContext, useForm } from 'react-hook-form'
import { Box, Grid, Typography } from '@material-ui/core'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import ActionDialog from 'components/common/ActionDialog'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'

import ForgotPasswordForm, { formOptions } from './form/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  const t = useDomain(Domain.Pages)
  const router = useRouter()
  const onChanged = () => router.push(routes.forgotPasswordSuccess)

  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm(formOptions)
  const {
    formState: { isSubmitting },
  } = methods

  return (
    <ActionDialog flex headerLabel="forgot_password" closeToDashboard maxWidth="xs">
      <Box flexGrow={12} px={3} py={3} my={5} display="flex" alignItems="center">
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Typography>{t('message_password_reset_link')}</Typography>
          </Grid>
          <Grid item>
            <FormContext {...methods}>
              <ForgotPasswordForm formRef={formRef} onPasswordLinkSent={onChanged} />
            </FormContext>
          </Grid>
        </Grid>
      </Box>
      <DialogFormSubmitButton
        formRef={formRef}
        loading={isSubmitting}
        label="send_password_reset"
        color="secondary"
      />
    </ActionDialog>
  )
}
