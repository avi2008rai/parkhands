import _ from 'lodash'
import React, { ReactNode } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { WizardStep } from 'components/hooks/useFormWizard'

const useStyles = makeStyles((theme) =>
  createStyles({
    wizardStep: {
      minHeight: '70vh',
      [theme.breakpoints.up('sm')]: {
        minHeight: 300,
      },
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
)

export default function SlotWizardStep({
  index,
  title,
  fields = <></>,
  button = <></>,
}: {
  index: number
  title?: string
  fields?: ReactNode
  button?: ReactNode
}) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)

  return (
    <WizardStep index={index}>
      <Box className={classes.wizardStep}>
        <Grid container direction="column">
          {title && (
            <Grid item>
              <Typography variant="h3" align="center">
                {t(title)}
              </Typography>
            </Grid>
          )}
          <Grid item>{fields}</Grid>
          <Grid item>{button}</Grid>
        </Grid>
      </Box>
    </WizardStep>
  )
}
