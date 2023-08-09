import React, { useCallback } from 'react'

import DialogSubmitButton, { DialogSubmitButtonProps } from './DialogSubmitButton'

export type DialogFormSubmitButtonProps = {
  formRef: React.RefObject<HTMLFormElement>
} & DialogSubmitButtonProps
export default function DialogFormSubmitButton({ formRef, ...props }: DialogFormSubmitButtonProps) {
  const submitForm = useCallback(() => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
  }, [formRef])

  return <DialogSubmitButton {...props} onClick={submitForm} />
}
