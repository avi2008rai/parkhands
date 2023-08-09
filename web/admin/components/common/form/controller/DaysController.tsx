import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import React, { useState, Fragment, useEffect, Component } from 'react'

import { Theme, Button } from '@material-ui/core'

import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'

const daysButtonStyles = makeStyles((theme) => ({
  button: {
    minWidth: 'unset',
    borderRadius: '50%',
    marginRight: '10px',
    fontSize: '0.813rem',
    margin: '5px 0',
    width: '30px',
    height: '30px',
    padding: '0',
    lineHeight: '30px',
  },

  disabled: {},
}))

export default function DaysController({ id, label, selected, changeSelectedStatus }: any) {
  const daysButtonClasses = daysButtonStyles()

  return (
    <Button
      type="button"
      disableElevation
      color={selected ? 'secondary' : 'primary'}
      variant="contained"
      classes={{
        root: daysButtonClasses.button,
      }}
      onClick={() => changeSelectedStatus(id)}>
      {label}
    </Button>
  )
}
