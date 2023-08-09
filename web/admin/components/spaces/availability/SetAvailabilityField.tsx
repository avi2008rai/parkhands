import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'

import { AddOutlined } from '@material-ui/icons'
import AvailabilityDateRange from 'components/common/form/controller/AvailabilityDateRange'
import { Domain } from 'common/i18n/locale'
import { useTranslation } from 'react-i18next'

import { ManageSpaceQuery, PickArrayType } from 'gql/schema'
import { addYears } from 'date-fns'

type Space = PickArrayType<ManageSpaceQuery['parkingSpace']>
type SpaceAvailability = PickArrayType<Space['parkingSpaceAvailabilitiesList']>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: { width: '100%' },
    card: { padding: theme.spacing(3) },
    disabled: {
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      background: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      color: '#ccc',
    },
    addButton: {
      padding: '4px',
      minWidth: 'unset',
      marginLeft: '20px',
    },
    formControl: {
      marginTop: theme.spacing(2),
    },
    boxMargin: {
      margin: '20px 0',
    },
  }),
)

export default function SetAvailabilityField() {
  const { t } = useTranslation(Domain.Spaces)
  const { errors, control, setValue } = useFormContext()
  const classes = useStyles()

  const [count, setCount] = useState(0)
  const [dateRangeComponent, setDateRangeComponent] = useState([{ id: 0, setDefault: true }])

  useEffect(() => {
    if (
      control.defaultValuesRef.current.availability &&
      control.defaultValuesRef.current.availability.length > 0
    ) {
      const availabilityObj = control.defaultValuesRef.current.availability
      availabilityObj.map((element: any, key: any) => {
        if (key !== 0) {
          setCount(key)
          setDateRangeComponent((prevState) => {
            const newDateRange = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
            newDateRange.push({ id: key, setDefault: element.defaultFlag })
            return newDateRange
          })
        } else {
          setDateRangeComponent([{ id: 0, setDefault: element.defaultFlag }])
        }
      })
    }
    // else {
    //   setDateRangeComponent([{ id: 0, setDefault: true }])
    // }
  }, [])

  useEffect(() => {
    dateRangeComponent.map((element, key) => {
      setValue(`availability[${element.id}].defaultFlag`, element.setDefault)
    })
  }, [dateRangeComponent])

  const addAvailabilityDateRange = (defaultFlag: boolean) => {
    let counter = count + 1
    setCount((prevCount) => prevCount + 1)
    setDateRangeComponent((prevState) => {
      const newDateRange = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
      newDateRange.push({ id: counter, setDefault: defaultFlag })
      return newDateRange
    })
  }

  const changeSetDefaultCheckbox = (key: any) => {
    setDateRangeComponent((prevState) => {
      const newDateRange = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
      newDateRange.forEach((dateRange) => {
        if (dateRange.id === key) {
          dateRange.setDefault = true
        } else {
          dateRange.setDefault = false
        }
      })
      return newDateRange
    })
  }

  const removeAvailabilityDateRange = (key: any) => {
    let newDateRange
    newDateRange = dateRangeComponent.filter((element) => element.id !== key)
    setDateRangeComponent(newDateRange)
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        className={classes.boxMargin}>
        <Typography variant="h3"> Set parking availability </Typography>
        <Button
          type="button"
          color="primary"
          variant="contained"
          className={classes.addButton}
          onClick={() => addAvailabilityDateRange(false)}>
          <AddOutlined color="secondary" />
        </Button>
      </Box>

      <Box color="secondary">
        <Typography color="secondary">{t('date_range', { ns: Domain.Spaces })}</Typography>

        {/* Array of Date Range component */}
        {dateRangeComponent.map((element, key) => {
          return (
            <AvailabilityDateRange
              key={element.id}
              id={element.id}
              setDefault={element.setDefault}
              removeDateRangeMethod={removeAvailabilityDateRange}
              changeSetDefaultMethod={changeSetDefaultCheckbox}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export function clearArray(rawArray: any[]) {
  return rawArray.filter(function (el: null) {
    return el != null || el != undefined
  })
}

export function formatDayOfWeek(data: any) {
  let anyOneDaySelectedFlag = false
  const formatedDayOfWeek = data.map((element: any) => {
    if (element.selected) {
      anyOneDaySelectedFlag = true
      return element.id
    }
  })

  if (!anyOneDaySelectedFlag) {
    return [new Date().getDay()]
  }
  return clearArray(formatedDayOfWeek)
}

export function prepareSpaceAvailability(availability: any) {
  const filteredAvailabilityArray = clearArray(availability)

  const avaialabilityObject = _.map(
    filteredAvailabilityArray,
    ({ fromDate, toDate, defaultFlag, closedFlag, openHours, workHours }) => {
      const finalObject: any = {
        fromDate,
        toDate,
        defaultFlag,
        closedFlag: !!closedFlag,
      }

      if (openHours) {
        const finalOpenHours = clearArray(openHours).map((element: any) => {
          return {
            fromTime: element.fromTime,
            toTime: element.toTime,
            price: parseFloat(element.price),
            dayOfWeek: { days: formatDayOfWeek(element.dayOfWeek) },
          }
        })

        finalObject.parkingOpenHoursUsingId = {
          deleteOthers: true,
          create: finalOpenHours,
        }
      }

      if (workHours) {
        const finalWorkHours = clearArray(workHours).map((element: any) => {
          return {
            fromTime: element.fromTime,
            toTime: element.toTime,
            dayOfWeek: { days: formatDayOfWeek(element.dayOfWeek) },
          }
        })

        finalObject.parkingWorkingHoursUsingId = {
          deleteOthers: true,
          create: finalWorkHours,
        }
      }

      return finalObject
    },
  )

  return {
    deleteOthers: true,
    create: avaialabilityObject,
  }
}

export type AvailabilityRecord = {
  fromDate: any
  toDate: any
  defaultFlag: boolean
  closedFlag: boolean
}

export function getInitialDate() {
  const currentDate = new Date()
  return [currentDate, addYears(currentDate, 10)]
}

export function initSpaceAvailability(
  spaceAvailabilitiesList: SpaceAvailability[],
): AvailabilityRecord[] {
  const [fromDate, toDate] = getInitialDate()
  const availability = spaceAvailabilitiesList.map((element) => {
    const dayAvailability = {
      fromDate,
      toDate,
      defaultFlag: false,
      closedFlag: false,
      openHours: {},
      workHours: {},
    }

    dayAvailability.defaultFlag = element.defaultFlag
    dayAvailability.closedFlag = element.closedFlag
    dayAvailability.fromDate = new Date(element.fromDate)
    dayAvailability.toDate = new Date(element.toDate)

    if (element.parkingOpenHoursList && element.parkingOpenHoursList.length > 0) {
      dayAvailability.openHours = element.parkingOpenHoursList.map((openHoursElement, key) => {
        return {
          fromTime: openHoursElement.fromTime,
          toTime: openHoursElement.toTime,
          price: openHoursElement.price,
          dayOfWeek: openHoursElement.dayOfWeek.days,
        }
      })
    }

    if (element.parkingWorkingHoursList && element.parkingWorkingHoursList.length > 0) {
      dayAvailability.workHours = element.parkingWorkingHoursList.map((workHoursElement, key) => {
        return {
          fromTime: workHoursElement.fromTime,
          toTime: workHoursElement.toTime,
          dayOfWeek: workHoursElement.dayOfWeek.days,
        }
      })
    }

    return dayAvailability
  })

  return availability
}
