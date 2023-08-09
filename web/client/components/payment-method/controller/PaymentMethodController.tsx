import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextFieldProps } from '@material-ui/core'

import SelectPaymentMethod from 'components/payment-method/form/SelectPaymentMethod'

export default function PaymentMethodController(props: TextFieldProps) {
  const { control, errors } = useFormContext()

  return (
    <Controller
      name="paymentMethodId"
      control={control}
      error={Boolean(errors.paymentMethodId)}
      helperText={errors['paymentMethodId']?.message}
      as={<SelectPaymentMethod {...props} />}
    />
  )
}
