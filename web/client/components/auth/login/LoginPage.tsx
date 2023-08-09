import React, { useRef } from 'react'
import { Box } from '@material-ui/core'
import { FormContext, useForm } from 'react-hook-form'

import ProfileLogo from 'components/common/ProfileLogo'
import ActionDialog from 'components/common/ActionDialog'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'

import LoginForm, { formOptions } from './LoginForm'
import useStyles from '../authStyles'
import LoginLinks from './LoginLinks'

export default function LoginPage() {
  const classes = useStyles()
  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm(formOptions)
  const {
    formState: { isSubmitting },
  } = methods
  return (
    <ActionDialog flex maxWidth="xs" closeToDashboard headerLabel="Login">
      <Box flexGrow={6} px={3} mt={3} py={3} display="flex" alignItems="center">
        <div className={classes.logo}>
          <ProfileLogo />
        </div>
      </Box>
      <FormContext {...methods}>
        <Box flexGrow={6} px={3}>
          <LoginForm formRef={formRef} />
          <LoginLinks />
        </Box>
        <DialogFormSubmitButton
          formRef={formRef}
          loading={isSubmitting}
          label="Login"
          color="secondary"
        />
      </FormContext>
    </ActionDialog>
  )
}
