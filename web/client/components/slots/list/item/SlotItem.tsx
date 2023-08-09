import React from 'react'
import { Typography, Box } from '@material-ui/core'

import { SlotByIdQuery } from 'gql/schema'

import SlotPrice from '../../SlotPrice'
import SlotItemBase, { SlotItemBaseProps } from './SlotItemBase'

type Slot = NonNullable<SlotByIdQuery['slot']>
type SlotItemProps = {
  static?: boolean
  pricePerHour: Slot['pricePerHour']
} & SlotItemBaseProps

export default function SlotItem(props: SlotItemProps) {
  return (
    <SlotItemBase {...props} slotImageProps={{ imageGradient: 'horizontal' }}>
      <Typography variant="h6">{props.name}</Typography>
      {!props.static && (
        <Typography variant="h4" color="secondary" align="left">
          <Box fontWeight={600}>
            <SlotPrice pricePerHour={props.pricePerHour} />
          </Box>
        </Typography>
      )}
    </SlotItemBase>
  )
}
