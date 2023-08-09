import _ from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Box, Link, Typography } from '@material-ui/core'
import { useForm, FormContext } from 'react-hook-form'

import { useUser } from 'components/hooks/useUser'
import useFormError from 'components/hooks/useFormError'
import SubmitButton from 'components/common/form/SubmitButton'
import ConsentDialog from 'components/common/form/ConsentDialog'
import NameController from 'components/form/controller/NameController'
import EmailController from 'components/form/controller/EmailController'
import ChangePasswordDialog from 'components/auth/password/dialog/ChangePasswordDialog'

import PhoneNumberController from './PhoneNumberController'
import validationSchema from './validation'
import ConfirmDialog from 'components/common/form/ConfirmDialog'
import useConfirm from 'components/hooks/useConfirm'

type ProfileFormData = {
  name: string
  email: string
  phone: string
}
export default function ProfileForm() {
  const { t } = useTranslation()
  const { user, updateProfile, loading } = useUser()
  const { FormError, setError: setAlert, resetError } = useFormError()
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const closeChangePassword = () => setChangePasswordOpen(false)

  const methods = useForm<ProfileFormData>({
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone || '',
    },
    validationSchema,
  })
  const { handleSubmit, watch } = methods

  const formValues = watch()
  const onConfirm = useCallback(async () => {
    try {
      await updateProfile({
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
      })
      setAlert('Updated!', 'success')
    } catch (error) {
      switch (error.message) {
        case 'duplicate key value violates unique constraint "user_email_unique_idx"':
          setAlert('alert_user_already_exist')
          break
        case _.get(error, 'graphQLErrors[0].message'):
          setAlert(_.get(error, 'graphQLErrors[0].message'))
          break
        case _.get(error, 'graphQLErrors[0].detail'):
          setAlert(_.get(error, 'graphQLErrors[0].detail'))
          break
        default:
          setAlert(error.message)
          break
      }
    }
  }, [formValues])

  const { open, openHandler, closeHandler, confirmHandler } = useConfirm({
    onClose: () => {},
    onConfirm,
  })

  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    openHandler()
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} method="POST" encType="multipart/form-data">
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item xs={12}>
            <NameController />
          </Grid>
          <Grid item xs={12}>
            <EmailController />
          </Grid>
          <Grid item xs={12}>
            <PhoneNumberController />
          </Grid>
          <Grid item>
            <Grid container justify="space-around">
              <Grid item>
                <SubmitButton label="Update" loading={loading} />
              </Grid>
              <Grid item>
                <Box py={1}>
                  <Link
                    href="#"
                    color="secondary"
                    onClick={(e: React.MouseEvent) => {
                      e?.preventDefault()
                      setChangePasswordOpen(true)
                    }}>
                    {t('change_password')}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <FormError />
        </Grid>
      </form>
      <ConsentDialog {...{ open, closeHandler, confirmHandler }} />
      <ChangePasswordDialog
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
        open={changePasswordOpen}
        onClose={closeChangePassword}
        onPasswordChanged={closeChangePassword}
      />
    </FormContext>
  )
}
