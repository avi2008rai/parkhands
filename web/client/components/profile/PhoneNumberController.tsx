import React from 'react'
import { TextFieldProps } from '@material-ui/core'

import TextFieldController from 'components/form/controller/TextFieldController'

export default function PhoneNumberController(props: TextFieldProps) {
  return <TextFieldController name="phone" label="phone_number" {...props} />
}
