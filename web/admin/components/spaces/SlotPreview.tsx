import React from 'react'
import { Grid } from '@material-ui/core'
import getConfig from 'next/config'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const config = getConfig().publicRuntimeConfig
const resolutions: { [key in 'small' | 'large']: string } = {
  small: `${config.CDN_URL}/thumbnails/uploads`,
  large: `${config.CDN_URL}/files/uploads`,
}

const useStyles = makeStyles(() =>
  createStyles({
    small: {
      maxWidth: '3rem',
    },
    large: {
      maxHeight: '14rem',
      maxWidth: '14rem',
    },
  }),
)

export default function SlotPreview({
  thumbnail = false,
  photoUrl,
}: {
  thumbnail?: boolean
  photoUrl?: string
}) {
  const classes = useStyles()
  if (!photoUrl) {
    return null
  }
  const size = thumbnail ? 'small' : 'large'
  return (
    <Grid container justify="center">
      <img src={`${resolutions[size]}/${photoUrl}`} className={classes[size]} />
    </Grid>
  )
}
