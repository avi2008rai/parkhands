import React from 'react'
import { InputProps } from '@material-ui/core'

import InputController from './InputController'

export default function HiddenIdController(props: InputProps) {
  return <InputController name="id" type="hidden" {...props} />
}
