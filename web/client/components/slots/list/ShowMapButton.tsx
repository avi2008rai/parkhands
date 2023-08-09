import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Hidden, Fab } from '@material-ui/core'
import { Map } from '@material-ui/icons'

import { useSidekick } from 'components/hooks/useSidekick'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    locationButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(1),
    },
  }),
)

export default function ShowMapButton() {
  const classes = useStyles()
  const { close } = useSidekick()
  const onClick = () => close()
  return (
    <Hidden smUp>
      <Fab className={classes.locationButton} size="small" color="primary" onClick={onClick}>
        <Map color="secondary" />
      </Fab>
    </Hidden>
  )
}
