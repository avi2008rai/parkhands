import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Grow } from '@material-ui/core'

import { useSidekick } from 'components/hooks/useSidekick'
import { useSelectedSlot } from 'components/hooks/useSelectedSlot'

import SlotCard from './slot-card/SlotCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(15),
      left: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
)

export default function PreselectedSlotCard() {
  const { primary } = useSidekick()
  const { selectSlot, slot, preselected } = useSelectedSlot()
  const classes = useStyles()

  if (primary || !slot || !preselected) {
    return null
  }

  return (
    <Grow in={!!slot} mountOnEnter unmountOnExit>
      <SlotCard className={classes.root} slot={slot} onClick={() => selectSlot({ slot })} />
    </Grow>
  )
}
