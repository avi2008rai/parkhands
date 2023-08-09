import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Button } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

const PARKHANDS_HELP_PHONE = '+44 54352435'
const PARKHANDS_ISSUES_EMAIL = 'Issues@parkhands.com'

const useStyles = makeStyles((theme) =>
  createStyles({
    labelText: {
      fontSize: theme.typography.pxToRem(10),
    },
  }),
)

type BookingTicketProps = {
  slotBookingId: string
}
export default function BookingTicket({ slotBookingId }: BookingTicketProps) {
  const { t } = useTranslation([Domain.General, Domain.Email])
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="body2">{t('problem_with_booking')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" className={classes.labelText}>
              {t('call_us')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              href={`tel:${PARKHANDS_HELP_PHONE.replace(' ', '')}`}>
              <Typography variant="caption" color="secondary">
                {PARKHANDS_HELP_PHONE}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" className={classes.labelText}>
              {t('email_us')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              target="_blank"
              variant="contained"
              href={`mailto:${PARKHANDS_ISSUES_EMAIL.toLowerCase()}?subject=${t(
                `${Domain.Email}@parkingIssueSubject`,
                { id: slotBookingId },
              )}`}>
              <Typography variant="caption" color="secondary">
                {PARKHANDS_ISSUES_EMAIL}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
