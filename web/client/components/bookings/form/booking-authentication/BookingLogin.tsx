import React, { useRef } from 'react'
import { FormContext, useForm } from 'react-hook-form'
import { Box, Typography } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'
import LoginForm, { formOptions } from 'components/auth/login/LoginForm'
import LoginLinks, { LoginLinksProps } from 'components/auth/login/LoginLinks'
import { useUserContext } from 'components/hooks/useUserContext'

type BookingLoginProps = {
  linksProps: LoginLinksProps
}

export default function BookingLogin({ linksProps }: BookingLoginProps) {
  const t = useDomain(Domain.General)
  const { setJwtToken } = useUserContext()
  const loginFormRef = useRef<HTMLFormElement>(null)
  const methods = useForm(formOptions)
  const {
    formState: { isSubmitting },
  } = methods

  return (
    <FormContext {...methods}>
      <Box flexGrow={8} px={2}>
        <Box py={1}>
          <Typography align="center">{t('login')}</Typography>
        </Box>
        <LoginForm formRef={loginFormRef} onSuccess={(jwt) => setJwtToken(jwt)} dense />
        <LoginLinks {...linksProps} dense />
      </Box>
      <DialogFormSubmitButton
        formRef={loginFormRef}
        loading={isSubmitting}
        label="continue"
        color="secondary"
      />
    </FormContext>
  )
}
