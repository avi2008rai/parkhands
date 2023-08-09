import React, { useState, createContext, useContext, ReactNode, PropsWithChildren } from 'react'
import { Grow } from '@material-ui/core'
import BackButton from 'components/common/BackButton'

type WizardProps = {
  steps: number
}
type WizardContext = {
  steps: number
  activeStep: number
  lastStep: boolean
  reset: () => void
  prev: () => void
  next: () => void
}

type WizardStepProps = {
  index: number
}
export const WizardStep = ({ index, children }: PropsWithChildren<WizardStepProps>) => {
  const { activeStep } = useFormWizard()
  const active = activeStep === index
  if (!active) {
    return null
  }
  return (
    <Grow in={active} timeout={250}>
      <div>{children}</div>
    </Grow>
  )
}

export const WizardStepBack = () => {
  const { prev, activeStep, lastStep } = useFormWizard()
  // We can't go back if we're at the initial screen
  if (activeStep === 0) {
    return null
  }
  // Last step is normally a success message
  if (lastStep) {
    return null
  }
  return <BackButton onClick={() => prev()} />
}

const DefaultContext = ({ steps }: WizardProps): WizardContext => {
  const [activeStep, setActiveStep] = useState(0)
  const lastStep = activeStep >= steps
  return {
    steps,
    activeStep,
    lastStep,
    prev: () => {
      if (activeStep - 1 >= 0) {
        setActiveStep(activeStep - 1)
      }
    },
    next: () => {
      if (!lastStep) {
        setActiveStep(activeStep + 1)
      }
    },
    reset: () => {
      setActiveStep(0)
    },
  }
}

const WizardContext = createContext<WizardContext>(null as any)

export function WizardProvider({ steps, children }: WizardProps & { children?: ReactNode }) {
  const { Provider } = WizardContext
  return <Provider value={DefaultContext({ steps })}>{children}</Provider>
}

export function useFormWizard() {
  return useContext(WizardContext)
}
