import React from 'react'
import { Check } from '@material-ui/icons'
import { SvgIconProps } from '@material-ui/core'

import {
  FlashIcon,
  BroomIcon,
  CameraIcon,
  MotherIcon,
  HandicapIcon,
  LightBulbIcon,
  ExtraWideIcon,
  ParkingLotIcon,
  CarWithARoofIcon,
} from 'components/amenity/icon'

type AmenityIconProps = {
  slug: string
} & SvgIconProps

export default function AmenityIcons({ slug, ...props }: AmenityIconProps) {
  switch (slug) {
    case 'handycapped':
      return <HandicapIcon {...props} />
    case 'mother-kid':
      return <MotherIcon {...props} />
    case 'illuminated':
      return <FlashIcon {...props} />
    case 'covered':
      return <CarWithARoofIcon {...props} />
    case 'monitored':
      return <CameraIcon {...props} />
    case 'freestanding':
      return <ParkingLotIcon {...props} />
    case 'dirty-free-no-tree':
      return <BroomIcon {...props} />
    case 'extra-wide':
      return <ExtraWideIcon {...props} />
    case 'electric':
      return <LightBulbIcon {...props} />
    default:
      return <Check {...props} />
  }
}
