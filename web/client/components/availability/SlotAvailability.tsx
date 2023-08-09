import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographyProps, Grid } from '@material-ui/core'

import { Domain } from 'common/i18n'
import { SlotByIdQuery } from 'gql/schema'

type Slot = NonNullable<SlotByIdQuery['slot']>

const week = [
  { name: 'Monday', dayOfWeek: 1 },
  { name: 'Tuesday', dayOfWeek: 2 },
  { name: 'Wednesday', dayOfWeek: 3 },
  { name: 'Thursday', dayOfWeek: 4 },
  { name: 'Friday', dayOfWeek: 5 },
  { name: 'Saturday', dayOfWeek: 6 },
  { name: 'Sunday', dayOfWeek: 0 },
]

type SlotAvailabilityProps = {
  slot: Slot
  typographyProps?: TypographyProps
}
export default function SlotAvailability({ slot, typographyProps = {} }: SlotAvailabilityProps) {
  const { t } = useTranslation(Domain.General)
  if (_.isEmpty(slot.slotAvailabilitiesList)) {
    return null
  }

  return (
    <Grid container spacing={1}>
      {[1, 2, 3, 4, 5, 6, 0].map((dayOfWeek) => {
        const timesheet = _.find(slot.slotAvailabilitiesList, { dayOfWeek })
        const day = _.find(week, { dayOfWeek })
        return (
          <Grid item key={dayOfWeek} xs={12}>
            <Grid container spacing={3} justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" color="primary" {...typographyProps}>
                  {day && t(day.name)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {timesheet ? (
                  <Typography variant="caption" align="right" color="primary" {...typographyProps}>
                    {timesheet.startHour.substring(0, 5)} - {timesheet.endHour.substring(0, 5)}
                  </Typography>
                ) : (
                  <Typography variant="caption" align="right" color="primary" {...typographyProps}>
                    {t('Closed')}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
