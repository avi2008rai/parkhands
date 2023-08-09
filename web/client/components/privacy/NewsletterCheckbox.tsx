import React from 'react'
import { Box, Checkbox, Typography } from '@material-ui/core'
import { Controller, EventFunction, useFormContext } from 'react-hook-form'

import { Domain, useDomain } from 'common/i18n'

type ConsentCheckboxProps = {
  name?: string
  onChange?: EventFunction
}
export default function NewsletterCheckbox({
  name = 'newsletter',
  onChange = ([event, checked]) => checked,
}: ConsentCheckboxProps) {
  const t = useDomain(Domain.Pages)
  const { control, watch } = useFormContext()
  const checked = watch(name)
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
          {t('label_receive_information')}
        </Typography>
      </Box>
    </Box>
  )
}
