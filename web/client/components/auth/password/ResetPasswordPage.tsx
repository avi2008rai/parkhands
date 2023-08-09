import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { FormContext, useForm } from 'react-hook-form'
import { Box, Grid, Typography } from '@material-ui/core'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import ActionDialog from 'components/common/ActionDialog'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'

import ChangePasswordForm, { formOptions } from './form/ChangePasswordForm'

export default function ResetPasswordPage() {
  const t = useDomain(Domain.Pages)
  const router = useRouter()
  const { token } = router.query
  const onChanged = () => router.push(routes.login)

  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm(formOptions)
  const {
    formState: { isSubmitting },
  } = methods

  return (
    <ActionDialog flex maxWidth="xs" headerLabel="change_password" closeToDashboard>
      <Box flexGrow={12} px={3} py={3} my={5} display="flex" alignItems="center">
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Typography>{t('label_new_password')}</Typography>
          </Grid>
          <Grid item>
            <FormContext {...methods}>
              <ChangePasswordForm
                formRef={formRef}
                jwtToken={token as string}
                requireCurrentPassword={false}
                onPasswordChanged={onChanged}
              />
            </FormContext>
          </Grid>
        </Grid>
      </Box>
      <DialogFormSubmitButton
        formRef={formRef}
        loading={isSubmitting}
        label="continue"
        color="secondary"
      />
    </ActionDialog>
  )
}
