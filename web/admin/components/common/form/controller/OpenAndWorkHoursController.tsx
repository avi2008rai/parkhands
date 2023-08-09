import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { useFormContext } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { Box, Grid, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Delete } from '@material-ui/icons'
import { Domain } from 'common/i18n/locale'

import TimePickerController from 'components/common/form/controller/TimePickerController'
import PriceController from 'components/spaces/controller/PriceController'
import DaysController from './DaysController'

const deleteButtonStyles = makeStyles((theme) => ({
  button: {
    minWidth: 'unset',
    borderRadius: '50%',
    padding: '10px',
    '&$disabled': {
      boxShadow: '3px 3px 10px rgb(12 17 22 / 50%), -3px -3px 10px rgb(79 93 103 / 50%)',
    },
  },
  disabled: {},
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxMargin: { margin: '20px 0' },
  }),
)

const OpenAndWorkHoursController = (props: any) => {
  const { t } = useTranslation(Domain.General)

  const [selectedFromTime, setSelectedFromTime] = useState(null)
  const [selectedToTime, setSelectedToTime] = useState(null)

  const [daysSelectedArray, setDaysSelectedArray] = useState([
    { id: 1, label: 'M', selected: false },
    { id: 2, label: 'T', selected: false },
    { id: 3, label: 'W', selected: false },
    { id: 4, label: 'T', selected: false },
    { id: 5, label: 'F', selected: false },
    { id: 6, label: 'S', selected: false },
    { id: 0, label: 'S', selected: false },
  ])

  const objectIdentifier = props.priceField ? 'openHours' : 'workHours'

  const { control, register, unregister, watch, setValue } = useFormContext()

  useEffect(() => {
    if (
      control.defaultValuesRef.current.availability &&
      control.defaultValuesRef.current.availability[props.parentId] &&
      control.defaultValuesRef.current.availability[props.parentId][objectIdentifier] &&
      control.defaultValuesRef.current.availability[props.parentId][objectIdentifier].length > 0 &&
      control.defaultValuesRef.current.availability[props.parentId][objectIdentifier][props.id]
    ) {
      const openWorkHoursObj =
        control.defaultValuesRef.current.availability[props.parentId][objectIdentifier][props.id]
      selectDefaultDays(openWorkHoursObj.dayOfWeek)
    } else {
      const curDay = new Date().getDay()
      setDaysSelectedArray((prevState) => {
        const newDaysSelected = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
        newDaysSelected.forEach((daysSelected) => {
          if (daysSelected.id === curDay) {
            daysSelected.selected = !daysSelected.selected
          }
        })
        return newDaysSelected
      })
    }
  }, [])

  useEffect(() => {
    register({
      name: `availability[${props.parentId}].${objectIdentifier}[${props.id}].dayOfWeek`,
      type: 'custom',
    })
    return () => {
      unregister(`availability[${props.parentId}].${objectIdentifier}[${props.id}].dayOfWeek`)
    }
  }, [register])

  useEffect(() => {
    setValue(
      `availability[${props.parentId}].${objectIdentifier}[${props.id}].dayOfWeek`,
      daysSelectedArray,
    )
  }, [daysSelectedArray])

  const handleButtonStatus = (buttonId: number) => {
    setDaysSelectedArray((prevState) => {
      const newDaysSelected = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
      newDaysSelected.forEach((daysSelected) => {
        if (daysSelected.id === buttonId) {
          daysSelected.selected = !daysSelected.selected
        }
      })
      return newDaysSelected
    })
  }

  const handleFromTimeChange = (time: any) => {
    setSelectedFromTime(time)
  }

  const handleToTimeChange = (date: any) => {
    setSelectedToTime(date)
  }

  const removeTimeRange = () => {
    props.removeTimeRangeMethod(props.id)
  }

  const selectDefaultDays = (days: number[]) => {
    setDaysSelectedArray((prevState) => {
      const newDaysSelected = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
      newDaysSelected.forEach((allDay) => {
        allDay.selected = false
      })
      days.forEach((element: number) => {
        newDaysSelected.forEach((daysSelected) => {
          if (daysSelected.id === element) {
            daysSelected.selected = true
          }
        })
      })
      return newDaysSelected
    })
  }

  const deleteButtonClasses = deleteButtonStyles()
  const classes = useStyles()

  return (
    <Box>
      <Grid container>
        <Box className={classes.boxMargin}>
          {daysSelectedArray.map((element, key) => {
            return (
              <DaysController
                key={element.id}
                id={element.id}
                label={element.label}
                selected={element.selected}
                changeSelectedStatus={handleButtonStatus}
              />
            )
          })}
          <Box>
            <Button onClick={() => selectDefaultDays([0, 1, 2, 3, 4, 5, 6])}>All</Button>
            <Button onClick={() => selectDefaultDays([1, 2, 3, 4, 5])}>Work days</Button>
            <Button onClick={() => selectDefaultDays([6, 0])}>Weekends</Button>
          </Box>
        </Box>
      </Grid>

      <Grid container>
        <Grid xs={11} item>
          <Grid container>
            <Grid xs={props.priceField ? 4 : 6} item>
              <TimePickerController
                name={`availability[${props.parentId}][${objectIdentifier}][${props.id}].fromTime`}
                label={'From'}
                timeValue={selectedFromTime}
                onChangemethod={handleFromTimeChange}
              />
            </Grid>

            <Grid xs={props.priceField ? 4 : 6} item>
              <TimePickerController
                name={`availability[${props.parentId}][${objectIdentifier}][${props.id}].toTime`}
                label={'To'}
                timeValue={selectedToTime}
                onChangemethod={handleToTimeChange}
              />
            </Grid>
            {props.priceField ? (
              <Grid xs={4} item>
                <PriceController id={props.id} parentId={props.parentId} />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid xs={1} item>
          <Button
            disabled={props.setDefault}
            type="button"
            color="primary"
            variant="contained"
            name="removeDateRange"
            classes={{ root: deleteButtonClasses.button, disabled: deleteButtonClasses.disabled }}
            onClick={() => removeTimeRange()}>
            <Delete color={props.setDefault ? 'disabled' : 'secondary'} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OpenAndWorkHoursController
