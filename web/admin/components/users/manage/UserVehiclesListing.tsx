import _ from 'lodash'
import React from 'react'
import { Alert } from '@material-ui/lab'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CropFree, Edit, AddCircleOutlined, ExpandMore } from '@material-ui/icons'

import { ManageUserQuery } from 'gql/schema'
import routes from 'common/routes'
import Form from 'components/vehicles/create/Form'
import LinkButton from 'components/common/LinkButton'
import useFormDrawer from 'components/common/hooks/useFormDrawer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    contentLeft: {
      fontSize: theme.typography.pxToRem(13),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    chips: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.25),
      },
    },
  }),
)

const VehiclesListing = ({ user }: ManageUserQuery) => {
  const classes = useStyles()

  if (_.isEmpty(user?.vehiclesByOwnerIdList)) {
    return (
      <Alert color="info" icon={<CropFree />}>
        No vehicles available
      </Alert>
    )
  }

  return (
    <Box>
      {_.map(user?.vehiclesByOwnerIdList, (vehicle) => (
        <Accordion key={vehicle.id} variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-label="Expand"
            aria-controls="-content"
            id="-header">
            <Typography className={classes.heading}>{vehicle.name}</Typography>
            <Box className={classes.secondaryHeading}>{vehicle?.licensePlate}</Box>
          </AccordionSummary>
          {/* <AccordionDetails>
            <Typography className={classes.contentLeft}>{'Price per hour'}</Typography>
            <Box className={classes.secondaryHeading}>{vehicle.} &euro;/h</Box>
          </AccordionDetails>
          <AccordionDetails>
            <Typography className={classes.contentLeft}>{'Amenities'}</Typography>
            <Box className={classes.secondaryHeading}>
              <Box className={classes.chips}>
                {_.map(vehicle.slotAmenitiesList, (amenity, index) => (
                  <Chip size="small" variant="outlined" key={index} label={amenity.amenity?.name} />
                ))}
              </Box>
            </Box>
          </AccordionDetails> */}
          <AccordionDetails>
            <Box m={2} width="100%">
              <Grid container justify="space-around">
                <LinkButton
                  color="primary"
                  variant="outlined"
                  startIcon={<Edit />}
                  {...routes.vehicles.manageById({ id: vehicle.id })}>
                  Manage
                </LinkButton>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default function UserVehiclesListing({
  user,
  refreshData,
}: ManageUserQuery & { refreshData: () => void }) {
  const classes = useStyles()
  const { FormDrawer, open, close } = useFormDrawer()
  return (
    <div className={classes.root}>
      <Box textAlign="center" mb={2}>
        <IconButton color="primary" title="Create Vehicle" onClick={open}>
          <AddCircleOutlined fontSize="large" />
        </IconButton>
        <FormDrawer label="Vehicles">
          <Form
            ownerId={user?.id}
            onCreated={() => {
              close()
              refreshData()
            }}
          />
        </FormDrawer>
      </Box>
      <Box mb={2}>
        <VehiclesListing user={user} />
      </Box>
    </div>
  )
}
