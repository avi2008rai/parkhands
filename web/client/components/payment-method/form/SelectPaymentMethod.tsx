import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import React, { useCallback, useEffect, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Box,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  TextFieldProps,
} from '@material-ui/core'

import { Domain } from 'common/i18n'
import { useFetch } from 'components/hooks/useFetch'
import SepaIcon from 'components/common/icon/SepaIcon'
import CreditCardIcon from 'components/common/icon/CreditCardIcon'
import { PaymentMethodListResponse } from 'pages/api/payment-method/list'

import CreateMethodFab from '../CreateMethodFab'

const useStyles = makeStyles((theme) =>
  createStyles({
    menuWithIcon: {
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
      },
      '& .MuiListItemIcon-root': {
        textAlign: 'center',
      },
      '& .MuiListItemText-root': {
        textAlign: 'left',
      },
    },
    loadingBar: {
      height: theme.spacing(0.5),
    },
  }),
)

export default function SelectPaymentMethod({ label, ...props }: TextFieldProps) {
  const classes = useStyles()
  const { t } = useTranslation([Domain.Forms, Domain.Validation])
  const { setValue, watch } = useFormContext()
  const [updateList, { data, loading, cancel }] = useFetch<PaymentMethodListResponse>({
    baseUrl: '/api/payment-method/list',
  })

  useEffect(() => {
    updateList()
    return () => cancel()
  }, [])

  const updateAndSelect = useCallback(
    (paymentMethodId: string) => {
      if (props.name) {
        // Mark the item as selected
        setValue(props.name, paymentMethodId, false)
      }
      updateList()
    },
    [setValue, updateList, loading],
  )

  useEffect(() => {
    if (!data) {
      return
    }
    // Preselect first source in the list
    if (props.name && data.preSelected) {
      const hasValue = watch(props.name)
      if (!hasValue) {
        setValue(props.name, data.preSelected)
      }
    }
  }, [data])

  // Show empty select while loading and hide it if no cards are available
  const showEmpty = useMemo(
    () =>
      !data || // Still loading
      data?.message || // Response error
      (typeof data?.count !== 'undefined' && data?.count === 0), // No payment methods
    [],
  )

  if (loading) {
    return (
      <Box textAlign="center">
        <LinearProgress
          color="secondary"
          classes={{
            root: classes.loadingBar,
          }}
        />
      </Box>
    )
  }

  return (
    <>
      <TextField
        select
        fullWidth
        variant="outlined"
        margin="dense"
        className={classes.menuWithIcon}
        {...props}>
        {showEmpty && (
          <MenuItem disabled>
            <Box textAlign="center">
              <em>{t(`${Domain.Validation}@No payment methods`)}</em>
            </Box>
          </MenuItem>
        )}
        {_.map(data?.cards, (card) => {
          return (
            <MenuItem key={card.id} value={card.id}>
              <ListItemIcon>
                <CreditCardIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>{`**** **** **** ${card.card?.last4}`}</ListItemText>
            </MenuItem>
          )
        })}
        {_.map(data?.sepaDebits, (sepaDebit) => {
          return (
            <MenuItem key={sepaDebit.id} value={sepaDebit.id}>
              <ListItemIcon>
                <SepaIcon fontSize="large" color="secondary" />
              </ListItemIcon>
              <ListItemText>{`${sepaDebit.sepa_debit?.country} ********** ${sepaDebit.sepa_debit?.last4}`}</ListItemText>
            </MenuItem>
          )
        })}
      </TextField>
      <Box textAlign="left" mt={2}>
        <CreateMethodFab onCreate={updateAndSelect} />
      </Box>
    </>
  )
}
