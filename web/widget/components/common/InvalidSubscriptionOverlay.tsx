import { Typography, Grid, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: theme.spacing(1.5),
      backgroundColor: grey.A400,
      opacity: 0.6,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
)

export default function InvalidSubscriptionOverlay() {
  const classes = useStyles()

  return (
    <div className={classes.overlay}>
      <Typography variant="h2" color="secondary" align="center" gutterBottom>
        This Parkhands subscription is no longer valid.
      </Typography>
      <Typography variant="subtitle1" color="secondary" align="center">
        When the provider renews their subscription this overlay will disappear.
      </Typography>
    </div>
  )
}
