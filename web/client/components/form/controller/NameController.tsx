import React from 'react'
import { TextFieldProps } from '@material-ui/core'

import TextFieldController from './TextFieldController'

export default function NameController(props: TextFieldProps) {
  return <TextFieldController name="name" label="Name" {...props} />
}
