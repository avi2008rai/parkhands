import _ from 'lodash'
import { Grid, Box } from '@material-ui/core'
import React, { useState } from 'react'
import { useForm, FormContext } from 'react-hook-form'

import { BillingDetails } from 'gql/utils'
import { useUser } from 'components/hooks/useUser'
import { useUpdateBillingProfileMutation } from 'gql/schema'
import FormAlert from 'components/alert/FormAlert'
import useFormError from 'components/hooks/useFormError'
import SubmitButton from 'components/common/form/SubmitButton'
import NameController from 'components/form/controller/NameController'
import EmailController from 'components/form/controller/EmailController'
import TextFieldController from 'components/form/controller/TextFieldController'
import PhoneNumberController from 'components/profile/PhoneNumberController'
import CountryFieldController from 'components/billing/controller/CountryFieldController'

import validationSchema from './validation'

export default function BillingDetailsForm() {
  const { user, refreshUser } = useUser()
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { FormError, setError, resetError } = useFormError()
  const [updateBillingProfile, { loading }] = useUpdateBillingProfileMutation()
  const methods = useForm<BillingDetails>({
    mode: 'onChange',
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      vatNumber: '',
      currency: 'EUR',
      address: {
        city: '',
        country: '',
        line1: '',
        line2: '',
        postal_code: '',
      },
      ...user?.billing_profile?.billing_details,
    },
    validationSchema,
  })
  const { handleSubmit } = methods
  const hideSuccessMessage = () => setSuccessMessage('')

  const onSubmit = handleSubmit(async (billingDetails, event) => {
    event?.preventDefault()
    resetError()
    try {
      // Handle edge case where user has no billing profile created
      if (!user.billing_profile.id) {
        setError('error_billing_profile_not_created')
        return
      }
      await updateBillingProfile({
        variables: {
          payload: {
            id: user.billing_profile.id,
            patch: { billingDetails },
          },
        },
      })
      refreshUser()
      setSuccessMessage('Updated!')
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].detail', _.get(error, 'graphQLErrors[0].message')))
      hideSuccessMessage()
    }
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} method="POST" encType="multipart/form-data">
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" justify="center" alignItems="stretch">
              <Grid item>
                <NameController />
              </Grid>
              <Grid item>
                <EmailController />
              </Grid>
              <Grid item>
                <PhoneNumberController />
              </Grid>
              <Grid item>
                <TextFieldController name="vatNumber" label="vat_number" />
              </Grid>
              <Grid item>
                <TextFieldController name="currency" label="Currency" disabled />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" justify="center" alignItems="stretch">
              <Grid item>
                <TextFieldController name="address[city]" label="City" />
              </Grid>
              <Grid item>
                <CountryFieldController name="address[country]" />
              </Grid>
              <Grid item>
                <TextFieldController name="address[line1]" label="address_line_1" />
              </Grid>
              <Grid item>
                <TextFieldController name="address[line2]" label="address_line_2" />
              </Grid>
              <Grid item>
                <TextFieldController name="address[postal_code]" label="postal_code" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" justify="center">
              <Grid item>
                <Box textAlign="center">
                  <SubmitButton label="Update" loading={loading} />
                </Box>
              </Grid>
              <Grid item>
                <FormError />
              </Grid>
              <Grid item>
                <FormAlert
                  show={!!successMessage}
                  alertProps={{ severity: 'success', onClose: hideSuccessMessage }}>
                  {successMessage}
                </FormAlert>
                {/* {!_.isEmpty(watch()) && <pre>{JSON.stringify(watch({ nest: true }), null, 2)}</pre>} */}
                {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormContext>
  )
}
