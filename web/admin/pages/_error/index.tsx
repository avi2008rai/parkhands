/**
 * Original source at
 * https://github.com/zeit/next.js/blob/canary/packages/next/pages/_error.tsx
 */
import React from 'react'
import { NextPageContext } from 'next'
import { ErrorProps } from 'next/error'
import { Container, Button, Typography, Avatar } from '@material-ui/core'
import { EventBusy } from '@material-ui/icons'

import AnonymousLayout from 'components/layout/AnonymousLayout'
import createPage from 'common/utils/createPage'

import useStyles from './styles'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

export default createPage({
  requireLogin: false,
  requirePermissions: () => true,
  getInitialProps: ({ res, err }: NextPageContext): Promise<ErrorProps> | ErrorProps => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode! : 404
    return { statusCode }
  },
  component: ({ statusCode }: { statusCode: number }) => {
    const title = statusCodes[statusCode] || 'An unexpected error has occurred'
    const classes = useStyles()
    return (
      <AnonymousLayout title={title}>
        <Container maxWidth="sm" className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EventBusy fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h2">
            {statusCode}
          </Typography>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Button href="/" color="primary" className={classes.button}>
            Go to Dashboard
          </Button>
        </Container>
      </AnonymousLayout>
    )
  },
})
