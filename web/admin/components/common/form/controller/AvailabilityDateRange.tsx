import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import React, { useState, Fragment, useEffect, Component } from 'react'

import { Box, Grid, Checkbox, Button, FormControlLabel, Typography } from '@material-ui/core'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ArrowDropDown, ArrowDropUp, Delete } from '@material-ui/icons'

import { Domain } from 'common/i18n/locale'
import { Controller, useFormContext } from 'react-hook-form'

import OpenAndWorkHours from 'components/spaces/open-work-hours/OpenAndWorkHours'
import DatePickerController from 'components/common/form/controller/DatePickerController'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxMargin: { margin: '20px 0' },
  }),
)

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

const buttonStyles = makeStyles((theme) => ({
  button: {
    margin: '10px 0',
    '&$disabled': {
      boxShadow: '3px 3px 10px rgb(12 17 22 / 50%), -3px -3px 10px rgb(79 93 103 / 50%)',
    },
  },
  disabled: {},
}))

const AvailabilityDateRange = (props: any) => {
  const { t } = useTranslation(Domain.General)
  const { errors, control } = useFormContext()

  const curDate = new Date()
  const [selectedFromDate, setSelectedFromDate] = useState(curDate)

  //Set To date with a value of 10years from the current date by default
  const [selectedToDate, setSelectedToDate] = useState(
    new Date(new Date().setFullYear(curDate.getFullYear() + 10)),
  )

  const [disableOpenWorkHours, setDisableOpenWorkHours] = useState(false)
  const [showOpenWorkHoursFlag, setShowOpenWorkHoursFlag] = useState(false)

  const [checked, setChecked] = React.useState(props.setDefault)
  const [checkedCloseRange, setCheckedCloseRange] = React.useState(false)

  const handleFromDateChange = (date: any) => {
    setSelectedFromDate(date)
  }

  const handleToDateChange = (date: any) => {
    setSelectedToDate(date)
  }

  const removeDateRange = () => {
    props.removeDateRangeMethod(props.id)
  }

  const disableOpenWorkHoursButton = () => {
    if (showOpenWorkHoursFlag) {
      setShowOpenWorkHoursFlag(false)
    }
    setDisableOpenWorkHours((prevState) => !prevState)
  }

  const changeDefaultDateRange = (event: any) => {
    event.preventDefault()
    if (event.target.checked) {
      setChecked(true)
      props.changeSetDefaultMethod(props.id)
    }
  }

  useEffect(() => {
    setChecked(props.setDefault)
  }, [props.setDefault])

  useEffect(() => {
    if (
      control.defaultValuesRef.current.availability &&
      control.defaultValuesRef.current.availability[props.id]
    ) {
      const availabilityObj = control.defaultValuesRef.current.availability
      setDisableOpenWorkHours(availabilityObj[props.id].closedFlag)
    }
  }, [])

  const toggleOpenWorkHours = () => {
    setShowOpenWorkHoursFlag((prevState) => !prevState)
  }

  const deleteButtonClasses = deleteButtonStyles()
  const buttonClasses = buttonStyles()
  const classes = useStyles()

  return (
    <Box className={classes.boxMargin}>
      <Typography variant="h4">Set date</Typography>

      <Grid container style={{ marginTop: '10px' }}>
        <Grid xs={11} item>
          <Grid container>
            <Grid xs={6} item>
              <DatePickerController
                name={`availability[${props.id}].fromDate`}
                label="From"
                dateValue={selectedFromDate}
                onChangemethod={handleFromDateChange}
              />
            </Grid>
            <Grid xs={6} item>
              <DatePickerController
                name={`availability[${props.id}].toDate`}
                label="To"
                dateValue={selectedToDate}
                onChangemethod={handleToDateChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1} item>
          <Button
            disabled={props.setDefault}
            type="button"
            color="primary"
            variant="contained"
            name="removeDateRange"
            classes={{
              root: deleteButtonClasses.button,
              disabled: deleteButtonClasses.disabled,
            }}
            onClick={() => removeDateRange()}>
            <Delete color={props.setDefault ? 'disabled' : 'secondary'} />
          </Button>
        </Grid>
      </Grid>

      <Box>
        <FormControlLabel
          control={
            <Controller
              as={<Checkbox />}
              name={`availability[${props.id}].defaultFlag`}
              checked={checked}
              onChange={(event) => {
                changeDefaultDateRange(event[0])
              }}
            />
          }
          key={`availability[${props.id}].defaultFlag`}
          label={'Set as Default'}
        />

        <FormControlLabel
          control={
            <Controller
              as={<Checkbox />}
              control={control}
              checked={!!checkedCloseRange}
              name={`availability[${props.id}].closedFlag`}
              onChange={([, checkedCloseRange]) => {
                disableOpenWorkHoursButton()
                return checkedCloseRange
              }}
            />
          }
          key={`availability[${props.id}].closedFlag`}
          label="Closed"
        />
      </Box>
      <Box>
        <Button
          disabled={disableOpenWorkHours}
          type="button"
          color="primary"
          variant="contained"
          classes={{ root: buttonClasses.button, disabled: buttonClasses.disabled }}
          onClick={toggleOpenWorkHours}
          endIcon={showOpenWorkHoursFlag ? <ArrowDropUp /> : <ArrowDropDown />}>
          Set open & work hours
        </Button>
      </Box>

      {/* {showOpenWorkHoursFlag ? <OpenAndWorkHours parentId={props.id} /> : null} */}
      <OpenAndWorkHours parentId={props.id} showHideFlag={showOpenWorkHoursFlag} />
    </Box>
  )
}

export default AvailabilityDateRange
