import _ from 'lodash'
import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import routes from 'common/routes'
import { WizardStepBack } from 'components/hooks/useFormWizard'
import CloseModalButton from 'components/common/CloseModalButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative', // for the absolutely positioned buttons
    },
    title: { paddingTop: theme.spacing(2) },
  }),
)

type SlotWizardHeaderProps = {
  title?: string
  onClose?: () => void
}

export default function SlotWizardHeader({ title, onClose }: SlotWizardHeaderProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)

  return (
    <Box className={classes.root}>
      <WizardStepBack />
      {title && (
        <Typography variant="subtitle2" align="center" className={classes.title}>
          {t(title)}
        </Typography>
      )}
      <CloseModalButton href={routes.slots.index.href} onClose={onClose} />
    </Box>
  )
}
