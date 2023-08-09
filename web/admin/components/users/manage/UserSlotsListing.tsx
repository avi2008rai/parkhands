import _ from 'lodash'
import React from 'react'
import { Alert } from '@material-ui/lab'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CropFree, LocationOn, Edit, AddCircleOutlined, ExpandMore } from '@material-ui/icons'

import { ManageUserQuery } from 'gql/schema'
import routes from 'common/routes'
import SlotForm from 'components/slots/SlotForm'
import LinkButton from 'components/common/LinkButton'
import SlotPreview from 'components/slots/SlotPreview'
import useFormDrawer from 'components/common/hooks/useFormDrawer'
import FormFooter from 'components/common/form/FormFooter'

import UploadSlotsButton from './UploadSlotsButton'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

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

const SlotsListing = ({ user }: ManageUserQuery) => {
  const classes = useStyles()

  if (_.isEmpty(user?.slotsByOwnerIdList)) {
    return (
      <Alert color="info" icon={<CropFree />}>
        No slots available
      </Alert>
    )
  }
  const { t } = useTranslation(Domain.Slots)
  return (
    <Box>
      {_.map(user?.slotsByOwnerIdList, (slot) => (
        <Accordion key={slot.id} variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-label="Expand"
            aria-controls="-content"
            id="-header">
            <Typography className={classes.heading}>{slot.name}</Typography>
            <Box className={classes.secondaryHeading}>
              {slot?.address?.formatted_address as string}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.contentLeft}>{'Price per hour'}</Typography>
            <Box className={classes.secondaryHeading}>{slot.pricePerHour} &euro;/h</Box>
          </AccordionDetails>
          {slot.photoUrl && (
            <AccordionDetails>
              <SlotPreview thumbnail photoUrl={slot.photoUrl} />
            </AccordionDetails>
          )}
          <AccordionDetails>
            <Typography className={classes.contentLeft}>{'Amenities'}</Typography>
            <Box className={classes.secondaryHeading}>
              <Box className={classes.chips}>
                {_.map(slot.slotAmenitiesList, (amenity, index) => (
                  <Chip size="small" variant="outlined" key={index} label={amenity.amenity?.name} />
                ))}
              </Box>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <FormFooter>
              <LinkButton
                color="primary"
                variant="outlined"
                startIcon={<LocationOn />}
                {...routes.slots.viewById({ id: slot.id })}>
                {t('view_slot')}
              </LinkButton>
              <LinkButton
                color="primary"
                variant="outlined"
                startIcon={<Edit />}
                {...routes.slots.manageById({ id: slot.id })}>
                {t('manage')}
              </LinkButton>
            </FormFooter>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default function UserSlotsListing({
  user,
  refreshData,
}: ManageUserQuery & { refreshData: () => void }) {
  const classes = useStyles()
  const { FormDrawer, open, close } = useFormDrawer()
  if (!user) {
    return null
  }
  return (
    <div className={classes.root}>
      <Box textAlign="center" mb={2}>
        <IconButton color="primary" title="Create Slot" onClick={open}>
          <AddCircleOutlined fontSize="large" />
        </IconButton>
        <UploadSlotsButton userId={user.id} onSuccess={() => refreshData()} />
        <FormDrawer label="Parking slots">
          <SlotForm
            ownerId={user?.id}
            onFormSuccess={() => {
              close()
              refreshData()
            }}
          />
        </FormDrawer>
      </Box>
      <Box mb={2}>
        <SlotsListing user={user} />
      </Box>
    </div>
  )
}
