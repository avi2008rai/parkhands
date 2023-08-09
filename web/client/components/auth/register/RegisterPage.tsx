import React, { useRef } from 'react'
import { Box } from '@material-ui/core'
import { FormContext, useForm } from 'react-hook-form'

import useStyles from 'components/auth/authStyles'
import ActionDialog from 'components/common/ActionDialog'
import RegisterForm, { formOptions } from 'components/auth/register/RegisterForm'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'
import ProfileLogo from 'components/common/ProfileLogo'

import RegisterLinks from './RegisterLinks'

export default function RegisterPage() {
  const classes = useStyles()

  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm(formOptions)
  const {
    formState: { isSubmitting },
  } = methods

  return (
    <ActionDialog flex maxWidth="xs" closeToDashboard>
      <Box flexGrow={6} px={3} py={3} my={5} display="flex" alignItems="center">
        <div className={classes.logo}>
          <ProfileLogo />
        </div>
      </Box>
      <Box flexGrow={6} px={3} mb={3}>
        <FormContext {...methods}>
          <RegisterForm formRef={formRef} />
          <RegisterLinks />
        </FormContext>
      </Box>
      <DialogFormSubmitButton
        formRef={formRef}
        loading={isSubmitting}
        label="Register"
        color="secondary"
      />
    </ActionDialog>
  )
}
