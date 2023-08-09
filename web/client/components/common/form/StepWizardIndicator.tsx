import cn from 'classnames'
import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useFormWizard } from 'components/hooks/useFormWizard'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 0,
    },
    stretchMargin: {
      margin: theme.spacing(0, -3), // Skip PageDialog margin
    },
    noMargin: {
      margin: 0,
    },
  }),
)

export default function StepWizardIndicator({ noMargin = false }: { noMargin?: boolean }) {
  const classes = useStyles()
  const { activeStep, steps } = useFormWizard()
  return (
    <LinearProgress
      variant="determinate"
      className={cn(classes.root, {
        [classes.stretchMargin]: !noMargin,
        [classes.noMargin]: noMargin,
      })}
      value={Math.ceil((activeStep / steps) * 100)}
    />
  )
}
