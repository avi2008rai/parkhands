import _ from 'lodash'
import React, { useEffect } from 'react'
import { Grid, LinearProgress } from '@material-ui/core'

import { useFetch } from 'components/hooks/useFetch'
import { PaymentMethodListResponse } from 'pages/api/payment-method/list'

import PaymentMethodSepa from './PaymentMethodSepa'
import PaymentMethodCard from './PaymentMethodCard'
import CreateMethodFab from './CreateMethodFab'

export default function PaymentMethodList() {
  const [refetch, { data, loading }] = useFetch<PaymentMethodListResponse>({
    baseUrl: '/api/payment-method/list',
  })

  const updateList = async () => refetch && (await refetch())

  useEffect(() => {
    // Initially load the list
    updateList()
  }, [])

  return (
    <Grid container direction="column">
      {loading && <LinearProgress color="secondary" variant="indeterminate" />}
      {_.map(data?.cards, (paymentMethod) => (
        <Grid item sm={12} key={paymentMethod.id}>
          <PaymentMethodCard paymentMethod={paymentMethod} onDelete={updateList} />
        </Grid>
      ))}
      {_.map(data?.sepaDebits, (paymentMethod) => (
        <Grid item sm={12} key={paymentMethod.id}>
          <PaymentMethodSepa paymentMethod={paymentMethod} onDelete={updateList} />
        </Grid>
      ))}
      <Grid item sm={12}>
        <CreateMethodFab onCreate={updateList} />
      </Grid>
    </Grid>
  )
}
