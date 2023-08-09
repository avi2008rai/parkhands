import _ from 'lodash'
import cn from 'classnames'
import { format, parse } from 'date-fns'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
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

import { Domain } from 'common/i18n/locale'
import TimeField from 'components/form/TimeField'
import { ManageSlotQuery, PickArrayType } from 'gql/schema'

import {
  AvailabilityProvider,
  DayOfWeek,
  getInitialHours,
  useAvailability,
} from './useAvailability'

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
        dayAvailability.endHour = parse(slotDay.endHour, 'kk:mm:00', new Date())
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
        startHour: format(startHour, 'HH:mm:00'), // 00:00 to 23:55
        endHour: format(endHour, 'kk:mm:00'), // 01:00 to 24:00
      }
    }),
  }
}

function MasterTimePicker() {
  const classes = useStyles()
  const {
    everyDay,
    masterStart,
    masterEnd,
    setMasterStart,
    setMasterEnd,
    setEveryDayEnabled,
  } = useAvailability()
  const { t } = useTranslation(Domain.Forms)

  return (
    <Grid container justify="space-between" direction="row" className={classes.fullWidth}>
      <Grid item xs={6}>
        <FormControlLabel
          label={t('every_day')}
          control={<Switch checked={everyDay} onChange={() => setEveryDayEnabled(!everyDay)} />}
        />
      </Grid>
      <Grid item xs={3}>
        <TimeField
          name="startHour"
          variant="standard"
          value={masterStart}
          disabled={!everyDay}
          onChange={(date) => setMasterStart(date)}
        />
      </Grid>
      <Grid item xs={3}>
        <TimeField
          name="endHour"
          variant="standard"
          value={masterEnd}
          disabled={!everyDay}
          onChange={(date) => setMasterEnd(date)}
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
  const { setStart, setEnd, setEnabled } = useAvailability()
  const { register, unregister, watch } = useFormContext()
  const { t } = useTranslation(Domain.Forms)

  const record = `availability[${dayOfWeek}]`
  const availability = watch(record)
  const { enabled, startHour, endHour } = availability

  useEffect(() => {
    register({ name: `${record}.startHour`, type: 'custom' })
    register({ name: `${record}.endHour`, type: 'custom' })
    register({ name: `${record}.enabled`, type: 'custom' })
    register({ name: `${record}.dayOfWeek`, type: 'custom' })

    return () => {
      unregister([
        `${record}.startHour`,
        `${record}.endHour`,
        `${record}.enabled`,
        `${record}.dayOfWeek`,
      ])
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
          label={t(name)}
          control={
            <Switch
              checked={enabled || false} // force controlled component on initial `undefined` value of `enabled`.
              onChange={() => setEnabled(dayOfWeek, !enabled)}
            />
          }
        />
      </Grid>
      <Grid item xs={3}>
        <TimeField
          value={startHour}
          variant="standard"
          name={`${record}.startHour`}
          onChange={(date) => setStart(dayOfWeek, date)}
        />
      </Grid>
      <Grid item xs={3}>
        <TimeField
          value={endHour}
          variant="standard"
          name={`${record}.endHour`}
          onChange={(date) => setEnd(dayOfWeek, date)}
        />
      </Grid>
    </Grid>
  )
}

export default function AvailabilityField() {
  const { errors } = useFormContext()
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)

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
