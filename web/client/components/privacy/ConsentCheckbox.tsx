import { Trans } from 'react-i18next'
import React, { useState } from 'react'
import { Box, Checkbox, Typography, Button } from '@material-ui/core'
import { Controller, EventFunction, useFormContext } from 'react-hook-form'

import { Domain, useDomain } from 'common/i18n'
import TermsDialog from 'components/privacy/TermsDialog'

type ConsentCheckboxProps = {
  name?: string
  onChange?: EventFunction
}
export default function ConsentCheckbox({
  name = 'acceptedTerms',
  onChange = ([event, checked]) => checked,
}: ConsentCheckboxProps) {
  const t = useDomain(Domain.Pages)
  const { control, watch, setValue } = useFormContext()
  const checked = watch(name)
  const [termsOpened, setTermsOpened] = useState(false)

  return (
    <Box textAlign="left" display="flex" alignItems="center">
      <Controller
        name={name}
        control={control}
        as={<Checkbox size="small" edge="start" />}
        checked={!!checked}
        onChange={onChange}
      />
      <Box>
        <Typography variant="subtitle2" align="left" display="inline">
          <Trans
            ns={Domain.Pages}
            i18nKey="agree_terms_conditions"
            components={{
              button: (
                <Button onClick={() => setTermsOpened(true)} size="small" color="secondary" />
              ),
            }}
          />
        </Typography>
      </Box>
      <TermsDialog
        open={termsOpened}
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
        onClose={() => setTermsOpened(false)}
        onAccept={() => {
          setValue(name, true, true)
          setTermsOpened(false)
        }}
      />
    </Box>
  )
}
