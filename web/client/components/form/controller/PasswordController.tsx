import React from 'react'
import { TextFieldProps } from '@material-ui/core'

import TextFieldController from './TextFieldController'

export default function PasswordController(props: TextFieldProps) {
  return <TextFieldController name="password" label="Password" type="password" {...props} />
}
