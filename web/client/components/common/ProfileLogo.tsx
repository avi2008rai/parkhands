import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import ParkhandsIcon from './ParkhandsIcon'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n'

const useStyles = makeStyles((theme) =>
  createStyles({
    logo: {
      marginBottom: theme.spacing(3),
      flexWrap: 'nowrap',
      display: 'flex',
      justifyContent: 'center',
    },
    text: {
      verticalAlign: 'bottom',
      fontWeight: 400,
      fontSize: theme.typography.pxToRem(33),
    },
  }),
)

type ProfileLogoProps = {}
export default function ProfileLogo({}: ProfileLogoProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.General)
  return (
    <div className={classes.logo}>
      <ParkhandsIcon fontSize="large" />
      <Typography className={classes.text} display="inline" variant="h2" paragraph>
        {t('rofile')}
      </Typography>
    </div>
  )
}
