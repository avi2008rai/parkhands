import _ from 'lodash'
import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { ManageSlotQuery, PickArrayType, SlotVerificationStatus } from 'gql/schema'

type Slot = PickArrayType<ManageSlotQuery['slot']>
type VerificationStatusProps = {
  slot?: Slot
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderColor: theme.palette.info.main,
    },
  }),
)

export default function VerificationStatus({ slot }: VerificationStatusProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Pages)

  if (!slot || slot.verificationStatus === SlotVerificationStatus.Verified) {
    return null
  }

  let infoText
  switch (slot.verificationStatus) {
    case SlotVerificationStatus.Pending:
      infoText = t(
        "This slot is pending verification from an admin. Unless the slot is verified it won't be shown on the map",
      )
      break
    case SlotVerificationStatus.Rejected:
      infoText = t(
        "This slot has been rejected by an admin. It's not being shown on the map. For more info why the slot got rejected, please contact an admin.",
      )
      break
    // The default should never be reached, because the if the status is verified the status is not shown at all.
    default:
      infoText = ''
  }

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography>{infoText}</Typography>
    </Paper>
  )
}
