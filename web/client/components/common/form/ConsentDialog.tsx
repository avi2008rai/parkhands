import React from 'react'
import { Typography } from '@material-ui/core'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'

import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog'

export type ConsentDialogProps = Pick<
  ConfirmDialogProps,
  'open' | 'closeHandler' | 'confirmHandler'
>
export default function ConsentDialog(props: ConsentDialogProps) {
  const t = useDomain(Domain.Pages)
  return (
    <ConfirmDialog
      {...props}
      confirmButton="i_agree"
      dialogTitle={t('title_update_profile')}
      dialogContent={
        <div>
          <Typography display="inline">{t('label_agree_with')}</Typography>
          <Typography
            align="left"
            component="a"
            target="_blank"
            display="inline"
            color="secondary"
            variant="subtitle2"
            href={routes.terms}>
            {t('terms_conditions')}
          </Typography>
        </div>
      }
    />
  )
}
