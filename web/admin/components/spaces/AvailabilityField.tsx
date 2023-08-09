import _ from 'lodash'
import cn from 'classnames'
import { format, parse } from 'date-fns'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Box,
  Card,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core'

import { ManageSlotQuery, PickArrayType } from 'gql/schema'
import { generateTodayTimeIntervals } from 'common/utils/time'
import SelectTimePicker from 'components/common/SelectTimePicker'

import {
  AvailabilityProvider,
  DayOfWeek,
  getInitialHours,
  useAvailability,
} from './useAvailability'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

type Slot = PickArrayType<ManageSlotQuery['slot']>
type SlotAvailability = PickArrayType<Slot['slotAvailabilitiesList']>

type Day = { name: string; dayOfWeek: DayOfWeek }
export type AvailabilityRecord = {
  enabled: boolean
  dayOfWeek: DayOfWeek
  startHour: Date
  endHour: Date
}

const week: Day[] = [
  { name: 'Monday', dayOfWeek: 1 },
  { name: 'Tuesday', dayOfWeek: 2 },
  { name: 'Wednesday', dayOfWeek: 3 },
  { name: 'Thursday', dayOfWeek: 4 },
  { name: 'Friday', dayOfWeek: 5 },
  { name: 'Saturday', dayOfWeek: 6 },
  { name: 'Sunday', dayOfWeek: 0 },
]

const todayTimeIntervals = generateTodayTimeIntervals()

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: { width: '100%' },
    card: { padding: theme.spacing(3) },
    disabled: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
)

export function initSlotAvailability(
  slotAvailabilitiesList?: SlotAvailability[],
): AvailabilityRecord[] {
  const availability = _.map<DayOfWeek, AvailabilityRecord>(
    _.range(7) as DayOfWeek[],
    (dayOfWeek: DayOfWeek) => {
      const [startHour, endHour] = getInitialHours()
      const dayAvailability = {
        enabled: false,
        dayOfWeek,
        startHour,
        endHour,
      }

      const slotDay = _.find(slotAvailabilitiesList, { dayOfWeek })
      if (slotDay) {
        dayAvailability.enabled = true
        dayAvailability.startHour = parse(slotDay.startHour, 'HH:mm:00', new Date())
        dayAvailability.endHour = parse(slotDay.endHour, 'HH:mm:00', new Date())
      }
      return dayAvailability
    },
  )

  return availability
}

export function prepareSlotPayload(availability: AvailabilityRecord[]) {
  const schedule = _.filter(availability, 'enabled') // store only enabled days
  return {
    deleteOthers: true,
    create: _.map(schedule, ({ dayOfWeek, startHour, endHour }) => {
      return {
        dayOfWeek,
        startHour: format(startHour, 'HH:mm:00'),
        endHour: format(endHour, 'HH:mm:00'),
      }
    }),
  }
}

function MasterTimePicker() {
  const { t } = useTranslation(Domain.Slots)
  const classes = useStyles()
  const {
    everyDay,
    masterStart,
    masterEnd,
    setMasterStart,
    setMasterEnd,
    setEveryDayEnabled,
  } = useAvailability()

  return (
    <Grid container justify="space-between" direction="row" className={classes.fullWidth}>
      <Grid item xs={6}>
        <FormControlLabel
          label={t('every_day')}
          control={
            <Switch
              checked={everyDay}
              onChange={({ target: { checked } }) => setEveryDayEnabled(!everyDay)}
            />
          }
        />
      </Grid>
      <Grid item xs={3}>
        <SelectTimePicker
          intervals={todayTimeIntervals}
          value={masterStart}
          name="startHour"
          disabled={!everyDay}
          onChange={(date) => setMasterStart(date)}
          variant="standard"
        />
      </Grid>
      <Grid item xs={3}>
        <SelectTimePicker
          intervals={todayTimeIntervals}
          value={masterEnd}
          name="endHour"
          disabled={!everyDay}
          onChange={(date) => setMasterEnd(date)}
          variant="standard"
        />
      </Grid>
    </Grid>
  )
}

type TimePickerProps = {
  name: string
  dayOfWeek: DayOfWeek
}

function TimePicker({ name, dayOfWeek }: TimePickerProps) {
  const classes = useStyles()
  const { setEnabled } = useAvailability()
  const { control, register, unregister, watch } = useFormContext()
  const record = `availability[${dayOfWeek}]`

  const enabled = watch(`${record}.enabled`)

  useEffect(() => {
    register({ name: `${record}.enabled`, type: 'custom' })
    register({ name: `${record}.dayOfWeek`, type: 'custom' })

    return () => {
      unregister(`${record}.enabled`)
      unregister(`${record}.dayOfWeek`)
    }
  }, [register, record])

  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      className={cn(classes.fullWidth, { [classes.disabled]: !enabled })}>
      <Grid item xs={6}>
        <FormControlLabel
          label={name}
          // disabled={everyDay}
          control={
            <Switch
              checked={enabled || false} // force controlled component on initial `undefined` value of `enabled`.
              onChange={({ target: { checked } }) => {
                setEnabled(dayOfWeek, !enabled)
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name={`availability[${dayOfWeek}].startHour`}
          control={control}
          as={<SelectTimePicker intervals={todayTimeIntervals} variant="standard" />}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name={`availability[${dayOfWeek}].endHour`}
          control={control}
          as={<SelectTimePicker intervals={todayTimeIntervals} variant="standard" />}
        />
      </Grid>
    </Grid>
  )
}

export default function AvailabilityField() {
  const { errors } = useFormContext()
  const classes = useStyles()
  const { t } = useTranslation(Domain.Slots)

  return (
    <AvailabilityProvider>
      <Card variant="outlined" className={classes.card}>
        <Typography variant="subtitle1" gutterBottom>
          {t('availability')}
        </Typography>
        <Box mb={3}>
          <MasterTimePicker />
        </Box>
        {_.map(week, ({ name, dayOfWeek }) => (
          <TimePicker key={name} name={name} dayOfWeek={dayOfWeek} />
        ))}
        {/* <pre>{JSON.stringify(watch('availability'), null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(watch('availability'), null, 2)}</pre> */}
        {Boolean(errors.availability) && (
          <FormHelperText error>{errors.availability.message}</FormHelperText>
        )}
      </Card>
    </AvailabilityProvider>
  )
}
