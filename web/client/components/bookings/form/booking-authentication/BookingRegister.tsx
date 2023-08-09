import React, { useRef } from 'react'
import { FormContext, useForm } from 'react-hook-form'
import { Box, Typography } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'
import RegisterForm, { formOptions } from 'components/auth/register/RegisterForm'
import { useUserContext } from 'components/hooks/useUserContext'
import RegisterLinks, { RegisterLinksProps } from 'components/auth/register/RegisterLinks'

type BookingRegisterProps = {
  linksProps: RegisterLinksProps
}
export default function BookingRegister({ linksProps }: BookingRegisterProps) {
  const t = useDomain(Domain.Pages)
  const { setJwtToken } = useUserContext()
  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm(formOptions)
  const {
    formState: { isSubmitting },
  } = methods

  return (
    <FormContext {...methods}>
      <Box flexGrow={4} px={2}>
        <Box py={1} mb={2}>
          <Typography align="center">{t('label_sign_up')}</Typography>
        </Box>
        <RegisterForm formRef={formRef} onSuccess={(jwt) => setJwtToken(jwt)} autoFocus={false} />
        <RegisterLinks {...linksProps} dense />
      </Box>
      <DialogFormSubmitButton
        formRef={formRef}
        loading={isSubmitting}
        label="continue"
        color="secondary"
      />
    </FormContext>
  )
}
