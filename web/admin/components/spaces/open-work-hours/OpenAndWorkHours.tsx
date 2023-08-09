import _ from 'lodash'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import SetOpenWorkHoursField from 'components/common/form/SetOpenWorkHoursField'

export default function OpenAndWorkHours({ parentId, showHideFlag }: any) {
  const { errors } = useFormContext()

  return (
    <Box style={{ display: showHideFlag ? 'block' : 'none' }}>
      <Box>
        <SetOpenWorkHoursField
          heading={'Open hours'}
          subHeading={
            'Please define the open hours of your parking space by marking the days and selecting the working hours.'
          }
          priceField={true}
          parentId={parentId}
        />
      </Box>
      <Box>
        <SetOpenWorkHoursField
          heading={'Work hours'}
          subHeading={
            'Please define the work hours of your business by marking the days and selecting the working hours.'
          }
          priceField={false}
          parentId={parentId}
        />
      </Box>
    </Box>
  )
}
