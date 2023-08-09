import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography, Paper, Box } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slotId: {
      fontSize: theme.typography.pxToRem(8),
    },
  }),
)

type BookingInfoProps = {
  slotName: string
  slotId: string
  bookingPrice: number
  bookingDurationInHours: number
}
export default function BookingInfo({
  slotName,
  slotId,
  bookingPrice,
  bookingDurationInHours,
}: BookingInfoProps) {
  const { t } = useTranslation(Domain.General)
  const classes = useStyles()

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={8}>
        <Box pt={1}>
          <Typography align="left" variant="body2">
            {t('Parking at')}
          </Typography>
          <Typography align="left" color="secondary" variant="h4">
            <Box component="span" fontWeight={600}>
              {slotName}
            </Box>
          </Typography>
          <Typography align="left" variant="caption" display="block" className={classes.slotId}>
            #{slotId.substring(0, 8)}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Box p={1.2}>
            <Typography variant="h3" color="secondary">
              {bookingPrice > 0 ? <>{bookingPrice} &euro;</> : t('Free')}
            </Typography>
            <Typography variant="caption">
              {t('Hour', {
                count: bookingDurationInHours,
              })}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
