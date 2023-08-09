import _ from 'lodash'
import React, { useState } from 'react'
import { Add } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { useMyVehiclesListQuery } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'
import VehicleForm from 'components/vehicle/form/VehicleForm'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
    },
  }),
)

export default function VehicleList() {
  const classes = useStyles()
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm(!showForm)
  const { userId } = useUser()
  const { data, refetch } = useMyVehiclesListQuery({
    variables: { ownerId: userId },
  })
  const updateList = async () => refetch && (await refetch())
  return (
    <Grid container direction="column">
      {_.map(data?.vehiclesList, (vehicle) => (
        <Grid item sm={12} key={vehicle.id}>
          <VehicleForm vehicle={vehicle} onDelete={updateList} onFormSuccess={updateList} />
        </Grid>
      ))}
      {showForm && (
        <Grid item sm={12}>
          <VehicleForm
            onFormSuccess={() => {
              updateList()
              toggleForm()
            }}
          />
        </Grid>
      )}
      <Grid item sm={12}>
        <IconButton onClick={() => toggleForm()} className={classes.icon}>
          <Add color="secondary" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
