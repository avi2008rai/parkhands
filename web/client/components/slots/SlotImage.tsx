import React, { useMemo } from 'react'
import cn from 'classnames'
import getConfig from 'next/config'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const config = getConfig().publicRuntimeConfig
const resolutions: { [key in SlotImageSize]: string } = {
  small: `${config.CDN_URL}/thumbnails/uploads`,
  large: `${config.CDN_URL}/files/uploads`,
  full: `${config.CDN_URL}/files/uploads`,
}

const defaultSlotPhoto = '/static/default-slot-image.png'
const defaultSpacePhoto = '/static/default-space-image.png'

const getImageHeight = (size: SlotImageSize) => {
  switch (size) {
    case 'small':
      return '7rem'
    case 'large':
      return '10rem'
    default:
      return '100%'
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: ({ size, noBorderRadius }: { size: SlotImageSize; noBorderRadius: boolean }) => ({
      width: '100%',
      height: getImageHeight(size),
      objectFit: 'cover',
      borderRadius: noBorderRadius ? 0 : theme.shape.borderRadius,
    }),
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
    },
    gradientVertical: {
      background: 'linear-gradient(to bottom, rgba(037, 054, 068, 0.2), rgba(037, 054, 068, 1))',
    },
    gradientHorizontal: {
      background: 'linear-gradient(to left, rgba(037, 054, 068, 0.2), rgba(037, 054, 068, 1))',
    },
  }),
)

type SlotImageSize = 'small' | 'large' | 'full'
export type SlotImageProps = {
  placeholder?: boolean
  photoUrl?: string | null
  size?: SlotImageSize
  noBorderRadius?: boolean
  isParkingSpace?: boolean
  imageHeight?: string
  imageGradient?: 'vertical' | 'horizontal' | ''
}

export default function SlotImage({
  photoUrl,
  placeholder = true,
  size = 'small',
  noBorderRadius = false,
  isParkingSpace = false,
  imageHeight = 'auto',
  imageGradient = '',
}: SlotImageProps) {
  const classes = useStyles({ size, noBorderRadius })
  const defaultPhoto = useMemo(() => {
    return isParkingSpace ? defaultSpacePhoto : defaultSlotPhoto
  }, [isParkingSpace])
  if (!placeholder && !photoUrl) {
    return null
  }

  const gradientClass = useMemo(() => {
    switch (imageGradient) {
      case 'vertical':
        return classes.gradientVertical
      case 'horizontal':
        return classes.gradientHorizontal
      default:
        return ''
    }
  }, [imageGradient])

  const imageOverlay = useMemo(() => {
    if (!gradientClass) {
      return null
    }
    return <div className={cn([classes.overlay, gradientClass])}></div>
  }, [gradientClass])

  return (
    <Box position="relative" lineHeight="0" height={imageHeight}>
      <img
        className={classes.image}
        src={(photoUrl && `${resolutions[size]}/${photoUrl}`) || defaultPhoto}
      />
      {imageOverlay}
    </Box>
  )
}
