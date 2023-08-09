import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import ActionDialog from 'components/common/ActionDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'
import { isSlot, useSelectedSlot } from 'components/hooks/useSelectedSlot'

import SlotDetails from './SlotDetails'
import StaticSlotDetails from './StaticSlotDetails'
import WishToParkSuccess from './wish-to-park/WishToParkSuccess'
import SelectedSlotCallToAction from './call-to-action/SelectedSlotCallToAction'

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      height: '100%',
      textAlign: 'left',
    },
  }),
)

export default function SelectedSlotDialog() {
  const classes = useStyles()
  const { slot, preselected, clearSelection } = useSelectedSlot()
  const [wishSuccess, setWishSuccess] = useState(false)

  if (!slot || preselected) {
    return null
  }

  return (
    <ActionDialog
      flex
      headerLabel={isSlot(slot) ? slot.name : slot.staticSpaceId}
      onClose={clearSelection}>
      <Box display="flex" className={classes.content}>
        {isSlot(slot) ? <SlotDetails slot={slot} /> : <StaticSlotDetails slot={slot} />}
      </Box>
      <WishToParkSuccess open={wishSuccess} onClose={() => setWishSuccess(false)} />
      {isSlot(slot) ? (
        <SelectedSlotCallToAction inDialog slot={slot} />
      ) : (
        <DialogSubmitButton
          fullWidth
          color="secondary"
          variant="contained"
          label="I wish to park here"
          onClick={() => setWishSuccess(true)}
        />
      )}
    </ActionDialog>
  )
}
