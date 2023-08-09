import _ from 'lodash'
import React from 'react'
import { format } from 'date-fns'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { Grid, Paper, Typography, Box, useMediaQuery } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import routes from 'common/routes'
import { Domain } from 'common/i18n/locale'
import LinkButton from 'components/common/LinkButton'
import { useSidekick } from 'components/hooks/useSidekick'
import { useUserContext } from 'components/hooks/useUserContext'
import { useActiveBooking } from 'components/hooks/useActiveBooking'

import LocationButton from '../LocationButton'
import CancelBookingButton from '../CancelBookingButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      zIndex: theme.zIndex.modal,
      fontSize: theme.typography.pxToRem(10),
      [theme.breakpoints.between('xs', 'sm')]: {
        top: theme.mixins.toolbar.minHeight,
        left: 0,
        right: 0,
        width: '100vw',
        padding: theme.spacing(0.5, 0.75),
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(3),
        top: theme.mixins.toolbar.minHeight,
        right: theme.spacing(2),
        width: '25rem',
        padding: theme.spacing(1.5),
      },
    },
    truncated: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    truncatedFlex: {
      minWidth: 0, // Because of https://css-tricks.com/flexbox-truncated-text/#the-solution-is-min-width-0-on-the-flex-child
    },
    time: {
      textShadow: '0px 0px 20px #0AFFEF93',
    },
  }),
)

export default function ActiveBookingPanel() {
  const { loggedIn } = useUserContext()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const { primary } = useSidekick()
  const classes = useStyles()
  const { t } = useTranslation([Domain.Pages, Domain.General])
  const { activeBooking, ongoing, checkOngoing, refreshBookings } = useActiveBooking()

  if (!loggedIn) {
    return null
  }

  if (mobile && primary) {
    return null
  }

  if (!activeBooking) {
    return null
  }
  return (
    <Paper className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Let the box grow more during and `ongoing` booking, because there is more space */}
        <Box flex={ongoing ? 20 : 4} className={classes.truncatedFlex}>
          <LinkButton fullWidth {...routes.bookings.viewById({ id: activeBooking.id })}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="caption" align="left">
                  <Box>{t(`${Domain.General}@parking_at`)}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" align="left">
                  <Box fontWeight="600" className={classes.truncated}>
                    {activeBooking?.slot?.name!}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </LinkButton>
        </Box>
        {ongoing ? (
          <Box flex={4} p={1}>
            <Typography variant="caption" align="right" color="secondary" className={classes.time}>
              <Box fontWeight="600">
                <Countdown
                  daysInHours
                  key={`${activeBooking.endTime!}`}
                  onComplete={refreshBookings}
                  date={new Date(activeBooking.endTime!)}>
                  <>{t('parking_period_expired')}</>
                </Countdown>
              </Box>
            </Typography>
          </Box>
        ) : (
          <Box flex={3} p={1}>
            <Typography align="right" variant="caption">
              <Box fontWeight="600">
                {format(new Date(activeBooking.startTime!), 'MM/dd/yyyy kk:mm')}
              </Box>
            </Typography>
            <Typography variant="caption" align="right" color="secondary" className={classes.time}>
              <Box fontWeight="600">
                <Countdown
                  daysInHours
                  key={`${activeBooking.startTime!}`}
                  onComplete={() => checkOngoing()}
                  date={new Date(activeBooking.startTime!)}
                />
              </Box>
            </Typography>
          </Box>
        )}
        <Box flex={1} p={1}>
          <CancelBookingButton bookingId={activeBooking.id} onCancel={refreshBookings} />
        </Box>
        <Box flex={1} p={1}>
          <LocationButton
            location={{
              lat: activeBooking?.slot?.location.latitude!,
              lng: activeBooking?.slot?.location.longitude!,
            }}
          />
        </Box>
      </Box>
    </Paper>
  )
}
