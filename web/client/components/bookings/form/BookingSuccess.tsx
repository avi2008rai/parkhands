import React from 'react'
import { useRouter } from 'next/router'
import { Typography, Box } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import routes from 'common/routes'
import useStyles from 'components/auth/authStyles'
import ActionDialog from 'components/common/ActionDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'
import CheckmarkIcon from 'components/common/icon/CheckmarkIcon'

type BookingSuccessProps = {
  bookingId: string
}

export default function BookingSuccess({ bookingId }: BookingSuccessProps) {
  const classes = useStyles()
  const t = useDomain([Domain.Forms, Domain.General])
  const router = useRouter()
  console.log('BookingSuccess', { bookingId })

  return (
    <ActionDialog flex maxWidth="xs" closeModalButtonProps={{ style: { display: 'none' } }}>
      <Box
        flexGrow={6}
        px={3}
        my={5}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end">
        <Box>
          <Typography variant="h3">{t('booking_confirmed')}</Typography>
        </Box>
      </Box>
      <Box flexGrow={6} px={3} mb={5}>
        <div style={{ minHeight: '20vh' }}>
          <CheckmarkIcon className={classes.checkmark} color="secondary" />
        </div>
      </Box>
      <DialogSubmitButton
        label="close"
        color="secondary"
        onClick={() => {
          const route = routes.bookings.viewById({ id: bookingId })
          const query = {
            closeToDashboard: true,
          }
          router.push({ pathname: route.href, query }, { pathname: route.as, query })
        }}
      />
    </ActionDialog>
  )
}
