import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Container, Paper } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import routes from 'common/routes'
import WizardSlotForm from 'components/slots/form/wizard/WizardSlotForm'
import { Domain } from 'common/i18n/locale'
import { WizardProvider } from 'components/hooks/useFormWizard'

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      overflow: 'hidden',
    },
  }),
)

export default function CreateSlotPage() {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(Domain.Pages)

  const onFormSuccess = () => {
    const { href, as } = routes.slots.index
    router.push(href, as)
  }
  return (
    <WizardProvider steps={4}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <WizardSlotForm onFormSuccess={onFormSuccess} />
        </Paper>
      </Container>
    </WizardProvider>
  )
}
