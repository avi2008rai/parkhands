import _ from 'lodash'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Fab, Hidden } from '@material-ui/core'
import { List } from '@material-ui/icons'
import React from 'react'

import { useDecksHelper } from 'components/slots/list/useDecksHelper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: theme.spacing(14),
      left: theme.spacing(1.5),
      [theme.breakpoints.down('md')]: {
        bottom: theme.spacing(3),
      },
    },
  }),
)

export default function SearchResultsButton() {
  const classes = useStyles()
  const { showSpaceColumnListing } = useDecksHelper()

  return (
    <Hidden mdUp>
      <Fab
        className={classes.root}
        color="primary"
        onClick={() => {
          showSpaceColumnListing()
        }}>
        <List color="secondary" fontSize="large" />
      </Fab>
    </Hidden>
  )
}
