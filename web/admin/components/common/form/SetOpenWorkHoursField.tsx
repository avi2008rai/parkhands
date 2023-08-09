import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Button, FormControl, Typography } from '@material-ui/core'

import { AddOutlined } from '@material-ui/icons'
import OpenAndWorkHoursController from 'components/common/form/controller/OpenAndWorkHoursController'

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

type ConfirmButtonProps = {
  heading: string
  subHeading: string
  priceField: boolean
  parentId: any
}

export default function SetOpenWorkHoursField({
  heading,
  subHeading,
  priceField,
  parentId,
}: ConfirmButtonProps) {
  const { errors, control } = useFormContext()
  const classes = useStyles()

  const [count, setCount] = useState(0)
  const [timeRangeComponent, setTimeRangeComponent] = useState<number[]>([])

  const objectIdentifier = priceField ? 'openHours' : 'workHours'

  useEffect(() => {
    if (
      control.defaultValuesRef.current.availability &&
      control.defaultValuesRef.current.availability[parentId] &&
      control.defaultValuesRef.current.availability[parentId][objectIdentifier] &&
      control.defaultValuesRef.current.availability[parentId][objectIdentifier].length > 0
    ) {
      const openHoursObj = control.defaultValuesRef.current.availability[parentId][objectIdentifier]
      openHoursObj.map((element: any, key: any) => {
        if (key !== 0) {
          setCount(key)
          setTimeRangeComponent((prevState) => {
            const newDateRange = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
            newDateRange.push(key)
            return newDateRange
          })
        } else {
          setTimeRangeComponent([0])
        }
      })
    }
  }, [])

  const addOpenHoursTimeRange = () => {
    let counter: number = count + 1
    setCount((prevCount) => prevCount + 1)

    setTimeRangeComponent((prevState) => {
      const newTimeRange = Array.from(prevState) // CREATING A NEW ARRAY OBJECT
      newTimeRange.push(counter)
      return newTimeRange
    })
  }

  const removeAvailabilityTimeRange = (key: any) => {
    let newTimeRange
    newTimeRange = timeRangeComponent.filter((element) => element !== key)
    setTimeRangeComponent(newTimeRange)
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center" marginTop="16px">
        <Typography variant="h4">{heading}</Typography>
        <Button
          type="button"
          color="primary"
          variant="contained"
          className={classes.addButton}
          onClick={addOpenHoursTimeRange}>
          <AddOutlined color="secondary" />
        </Button>
      </Box>

      <Box color="secondary">
        <Typography color="secondary" className={classes.boxMargin}>
          {subHeading}
        </Typography>

        {/* Array of Time Range component */}
        {timeRangeComponent.map((element: any, key: any) => {
          return (
            <OpenAndWorkHoursController
              key={element}
              id={element}
              parentId={parentId}
              priceField={priceField}
              removeTimeRangeMethod={removeAvailabilityTimeRange}
            />
          )
        })}
      </Box>
    </Box>
  )
}
