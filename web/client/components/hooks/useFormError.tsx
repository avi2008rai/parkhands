import React, { useCallback, useMemo, useState } from 'react'
import { Color } from '@material-ui/lab/Alert'

import FormError, { FormErrorProps } from 'components/common/form/FormError'

const useFormError = () => {
  const [formError, setFormError] = useState<string | undefined>()
  const [severity, setSeverity] = useState<Color>('error')
  const resetError = useCallback(() => setFormError(undefined), [])

  const AlertComponent = useMemo(
    () => (props: FormErrorProps) => (
      <FormError error={formError} severity={severity} onClose={resetError} {...props} />
    ),
    [formError, severity, resetError],
  )

  return {
    error: formError,
    setError(error: string, severity: Color = 'error') {
      setFormError(error)
      setSeverity(severity)
    },
    resetError,
    FormError: AlertComponent,
  }
}

export default useFormError
