import cn from 'classnames'
import React from 'react'
import { Grid, Card } from '@material-ui/core'
import { GenericSlot, isSlot } from 'components/hooks/useSelectedSlot'

import SlotImage from '../../SlotImage'
import SlotCardContent from './SlotCardContent'
import StaticSlotCardContent from './StaticSlotCardContent'
import useStyles from './styles'

type SlotCardProps = {
  slot: GenericSlot
  className?: string
  onClick: () => void
}

export default function SlotCard({ slot, className, onClick }: SlotCardProps) {
  const classes = useStyles()

  return (
    <Card className={cn(classes.root, className)}>
      <Grid container spacing={0}>
        <Grid item xs={4} onClick={onClick}>
          <SlotImage size="full" photoUrl={isSlot(slot) ? slot.photoUrl : ''} imageHeight="100%" />
        </Grid>
        <Grid item xs={8}>
          {isSlot(slot) ? (
            <SlotCardContent slot={slot} onClick={onClick} />
          ) : (
            <StaticSlotCardContent slot={slot} onClick={onClick} />
          )}
        </Grid>
      </Grid>
    </Card>
  )
}
