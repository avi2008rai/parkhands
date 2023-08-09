import React from 'react'
import { TextFieldProps } from '@material-ui/core'

import TextFieldController from './TextFieldController'

export default function EmailController(props: TextFieldProps) {
  return <TextFieldController name="email" label="Email" {...props} />
}
