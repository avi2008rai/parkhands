import React from 'react'
import { ButtonBase, ButtonBaseProps } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { PickArrayType, SlotsListQuery } from 'gql/schema'

import SlotImage, { SlotImageProps } from '../../SlotImage'

type Slot = PickArrayType<SlotsListQuery['slotsList']>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      boxShadow: '3px 3px 10px #151E2680',
      borderRadius: theme.shape.borderRadius,
      cursor: 'pointer',
      width: '100%',
      overflow: 'hidden',
    },
    content: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'left',
      padding: theme.spacing(1.25),
    },
  }),
)

export type SlotItemBaseProps = {
  buttonProps?: ButtonBaseProps
  slotImageProps?: SlotImageProps
} & Pick<Slot, 'name' | 'photoUrl'>
type SlotItemPropsWithChildren = React.PropsWithChildren<SlotItemBaseProps>

export default function SlotItemBase({
  photoUrl,
  buttonProps,
  children,
  slotImageProps = {},
}: SlotItemPropsWithChildren) {
  const classes = useStyles()

  return (
    <ButtonBase focusRipple className={classes.root} {...buttonProps}>
      <SlotImage
        photoUrl={photoUrl}
        imageGradient={slotImageProps.imageGradient}
        {...slotImageProps}
      />
      <div className={classes.content}>{children}</div>
    </ButtonBase>
  )
}
