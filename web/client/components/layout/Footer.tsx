import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import routes from 'common/routes'
import Link from 'components/common/Link'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      zIndex: theme.zIndex.modal + 10,
      [theme.breakpoints.only('xs')]: {
        zIndex: theme.zIndex.modal - 10,
      },
    },
    paper: {
      background:
        'transparent linear-gradient(99deg, #263846 0%, #22323E 100%) 0% 0% no-repeat padding-box',
    },
    copyright: {
      padding: '.25rem',
      paddingLeft: '1rem',
      fontSize: '.75rem',
    },
    terms: {
      padding: '.25rem',
      paddingRight: '1rem',
      fontSize: '.65rem',
      [theme.breakpoints.only('xs')]: {
        padding: '.2rem',
        paddingRight: '.6rem',
        fontSize: '2.5vw',
      },
      color: theme.palette.secondary.main,
    },
  }),
)

export default function Footer() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Box component="footer" className={classes.root}>
      <Paper elevation={4} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography className={classes.copyright} noWrap>
              &copy; {new Date().getFullYear()} {t('Parkhands')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" overflow="hidden">
            <Link color="textPrimary" href={routes.privacy}>
              <Typography className={classes.terms} noWrap>
                {t('privacy_policy')}
              </Typography>
            </Link>
            <Link color="textPrimary" href={routes.terms}>
              <Typography className={classes.terms} noWrap>
                {t('terms_and_conditions')}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
