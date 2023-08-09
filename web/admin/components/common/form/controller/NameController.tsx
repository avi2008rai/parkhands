import React from 'react'

import TextFieldController from './TextFieldController'

interface INameController {
  label: string
}

export default function NameController({label}: INameController) {
  return <TextFieldController name="name" label={label} />
}
