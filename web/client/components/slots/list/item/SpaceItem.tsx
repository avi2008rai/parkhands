import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import SlotItemBase, { SlotItemBaseProps } from './SlotItemBase'
import { Dataset } from 'gql/utils'

type SpaceItemProps = SlotItemBaseProps & {
  slotsList?: { id: string }[]
} & Partial<Dataset.StaticSpace>

export default function SpaceItem(props: SpaceItemProps) {
  const { t } = useTranslation(Domain.General)

  return (
    <SlotItemBase {...props} slotImageProps={{ imageGradient: 'horizontal', isParkingSpace: true }}>
      <Typography variant="h5">
        {props?.staticId ? t(props.name) : props.name}
        {props?.staticId && ` #${props?.staticId}`}
      </Typography>
      <Typography variant="h4" color="secondary" align="left">
        <Box fontWeight="600">
          {t('slot_count', {
            count: props?.slotsCount ? props.slotsCount : props.slotsList?.length,
          })}
        </Box>
      </Typography>
    </SlotItemBase>
  )
}
