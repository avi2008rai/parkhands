import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Fab, Typography, useMediaQuery } from '@material-ui/core'
import { Phone } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: theme.spacing(1.5),
      right: theme.spacing(1.5),
    },
    phoneNumber: {
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 1.5), // provide some space for the fab button to be clickable
      userSelect: 'all',
      cursor: 'text',
    },
  }),
)

type PhoneButtonProps = {
  phone: string
}

export default function PhoneButton({ phone }: PhoneButtonProps) {
  const classes = useStyles()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const [phoneVisible, setPhoneVisible] = useState(false)

  return (
    <Fab
      component="a"
      disableRipple
      disableFocusRipple
      variant={phoneVisible ? 'extended' : 'round'}
      size={phoneVisible || mobile ? 'large' : 'medium'}
      className={classes.root}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (mobile) {
          window.location.href = `tel:${phone}` // Prompt a phone call
        } else {
          setPhoneVisible(!phoneVisible)
        }
      }}
      color="primary">
      {phoneVisible ? (
        <Typography
          variant="caption"
          color="secondary"
          className={classes.phoneNumber}
          onClick={(e) => {
            // Interpret clicks on the text to be text selection.
            // Prevent the click so the user can select the text.
            // Otherwise the click is handled by the Fab and the phone number is hidden.
            e.preventDefault()
            e.stopPropagation()
          }}>
          {phone}
        </Typography>
      ) : (
        <Phone color="secondary" />
      )}
    </Fab>
  )
}
