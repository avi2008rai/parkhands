import React from 'react'
import {
  AddCircleOutline,
  Receipt,
  BusinessCenter,
  Dashboard,
  DirectionsCar,
  EmojiTransportation,
  Map,
  People,
  PowerSettingsNew,
  Assignment,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, Divider, ListItemText, Avatar } from '@material-ui/core'

import routes from 'common/routes'
import Link from 'components/common/Link'
import { useUser } from 'components/hooks/useUser'
import ListItemLink from 'components/common/ListItemLink'
import LinkIconButton from 'components/common/LinkIconButton'
import ParkhandsLogo from 'components/layout/logo'

import LanguageSwitcher from './LanguageSwitcher'

const useStyles = makeStyles((theme) => ({
  avatar: {
    padding: theme.spacing(3),
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
}))

export default function Nav() {
  const classes = useStyles()
  const { user, role, can } = useUser()
  return (
    <List aria-label="main">
      <ListItem>
        <Box mx="auto" my={2}>
          <Link href={routes.dashboard}>
            <Avatar className={classes.avatar}>
              <ParkhandsLogo fontSize="large" />
            </Avatar>
          </Link>
        </Box>
      </ListItem>
      <ListItemText
        disableTypography
        primary={
          <Box mx="auto" mb={2} display="flex" justifyContent="center">
            {user.name}
          </Box>
        }
      />
      <Divider variant="middle" />
      <ListItemLink primary="dashboard" url={routes.dashboard} icon={<Dashboard />} />
      {can.manageUsers && (
        <ListItemLink
          primary="users"
          url={routes.users.index}
          icon={<People />}
          secondaryAction={
            <LinkIconButton size="small" {...routes.users.create}>
              <AddCircleOutline />
            </LinkIconButton>
          }
        />
      )}
      <ListItemLink
        primary="slots"
        url={routes.slots.index}
        icon={<EmojiTransportation />}
        secondaryAction={
          role.isSuperAdmin ? (
            <LinkIconButton size="small" {...routes.slots.create}>
              <AddCircleOutline />
            </LinkIconButton>
          ) : undefined
        }
      />
      {can.approveSlots && (
        <ListItemLink primary="approve_slots" url={routes.approveSlots} icon={<Assignment />} />
      )}
      <ListItemLink
        primary="spaces"
        url={routes.spaces.index}
        icon={<EmojiTransportation />}
        secondaryAction={
          role.isSuperAdmin ? (
            <LinkIconButton size="small" {...routes.spaces.create}>
              <AddCircleOutline />
            </LinkIconButton>
          ) : undefined
        }
      />
      {can.approveSpaces && (
        <ListItemLink primary="approve_spaces" url={routes.approveSpaces} icon={<Assignment />} />
      )}
      <ListItemLink
        primary="vehicles"
        url={routes.vehicles.index}
        icon={<DirectionsCar />}
        secondaryAction={
          <LinkIconButton size="small" {...routes.vehicles.create}>
            <AddCircleOutline />
          </LinkIconButton>
        }
      />
      <ListItemLink primary="billing" url={routes.billing} icon={<Receipt />} />
      {can.manageBookings && (
        <ListItemLink primary="bookings" url={routes.bookings.index} icon={<Map />} />
      )}
      {role.isSuperAdmin && (
        <ListItemLink primary="partners" url={routes.partners} icon={<BusinessCenter />} />
      )}
      <Divider variant="middle" />
      <ListItemLink primary="logout" url={routes.logout} icon={<PowerSettingsNew />} />
      <ListItemText
        disableTypography
        primary={
          <Box mx="auto" mb={2} display="flex" justifyContent="center">
            <LanguageSwitcher />
          </Box>
        }
      />
    </List>
  )
}
