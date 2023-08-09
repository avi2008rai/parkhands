import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import routes from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import LanguageSwitcher from 'components/layout/LanguageSwitcher'
import { useDomain, Domain } from 'common/i18n'

const useStyles = makeStyles((theme) =>
  createStyles({
    loginBtn: {
      color: theme.palette.common.white,
    },
    signUpBtn: {
      marginLeft: theme.spacing(2),
    },
  }),
)

export default function PublicMenu() {
  const t = useDomain(Domain.Navigation)
  const classes = useStyles()
  return (
    <Grid container justify="flex-end" alignItems="center" direction="row" wrap="nowrap">
      <LanguageSwitcher />
      <LinkButton
        color="primary"
        variant="contained"
        href={routes.login}
        className={classes.loginBtn}>
        {t('Login')}
      </LinkButton>
      <LinkButton
        color="primary"
        variant="contained"
        href={routes.register}
        className={classes.signUpBtn}>
        {t('signup')}
      </LinkButton>
    </Grid>
  )
}
