import React from 'react'
import cn from 'classnames'
import { Box } from '@material-ui/core'

import WishToParkButton from '../wish-to-park/WishToParkButton'
import useStyles from './styles'

export default function StaticSlotCallToAction() {
  const classes = useStyles()

  return (
    <Box className={cn(['CallToActionButton', classes.buttonContainer])}>
      <WishToParkButton
        fullWidth
        variant="contained"
        color="secondary"
        classes={{
          root: classes.cta,
          label: classes.label,
        }}
      />
    </Box>
  )
}
