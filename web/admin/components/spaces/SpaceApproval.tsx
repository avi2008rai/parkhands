import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Typography, Button, ButtonGroup } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Check, Clear } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import {  ManageSpaceQuery } from 'gql/schema'
import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    approve: {
      color: theme.palette.success.main,
    },
    reject: {
      color: theme.palette.error.main,
    },
  }),
)

type SpaceApprovalProps = {
  space: ManageSpaceQuery['parkingSpace']
}

export default function SpaceApproval({ space }: SpaceApprovalProps) {
  const classes = useStyles()
  const { t } = useTranslation([Domain.General, Domain.Pages])

  if (!space || true) {
    // Check if the slot has pending approval status.
    return null
  }

  return (
    <Alert severity="warning">
      <AlertTitle>{t(`${Domain.Pages}:This slot is pending approval`)}</AlertTitle>
      <Typography variant="body2" paragraph>
        {t(
          `${Domain.Pages}:Please, review the slot data and Approve or Reject the slot. Approving the slot will display the slot in the map and make it bookable according to it's availability.`,
        )}
      </Typography>
      <ButtonGroup size="small">
        <Button className={classes.approve} startIcon={<Check />}>
          {t('approve')}
        </Button>
        <Button className={classes.reject} startIcon={<Clear />}>
          {t('reject')}
        </Button>
      </ButtonGroup>
    </Alert>
  )
}
