import _ from 'lodash'
import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid, Typography, Paper } from '@material-ui/core'

import { useUser } from 'components/hooks/useUser'
import { useMyBusinessListQuery } from 'gql/schema'
import useWidgetIframe from 'components/hooks/useWidgetIframe'
import BusinessForm from 'components/business/form/BusinessForm'

const defaultLocation = {
  lat: 52.264537,
  lng: 10.542015,
}

const useStyles = makeStyles((theme) =>
  createStyles({
    mapContainer: {
      width: '100%',
      height: 600,
    },
    fullHeight: {
      height: '100%',
    },
    map: {
      height: '50vh',
      overflow: 'hidden',
      borderRadius: theme.spacing(2),
    },
    code: {
      padding: theme.spacing(2),
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
    },
  }),
)

// Intended for local development
export default function DocsPage() {
  const [version, setVersion] = useState(1)
  const classes = useStyles()
  const { userId } = useUser()
  const { data, refetch } = useMyBusinessListQuery({ variables: { ownerId: userId } })
  const { code } = useWidgetIframe({
    userId,
    version,
    widgetType: 'map',
    location: `@${defaultLocation.lat},${defaultLocation.lng},${14}`,
  })

  return (
    <Container>
      <Box my={10}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h1" color="secondary">
              Parkhands Map Widget preview:
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={5}>
                <Typography variant="h4" color="secondary" paragraph>
                  Business Profile
                </Typography>
                {_.map(data?.businessesList, (business) => (
                  <BusinessForm
                    key={business.id}
                    business={business}
                    direction="column"
                    onCreate={async () => await refetch()}
                    onDelete={async () => await refetch()}
                    onFormSuccess={() => setVersion((version) => version + 1)}
                  />
                ))}
                {data?.businessesList?.length === 0 && (
                  <BusinessForm
                    direction="column"
                    onCreate={async () => await refetch()}
                    onDelete={async () => await refetch()}
                    onFormSuccess={() => setVersion((version) => version + 1)}
                  />
                )}
              </Grid>
              <Grid item xs={7} className={classes.mapContainer}>
                <Paper className={classes.map}>
                  <div className={classes.fullHeight} dangerouslySetInnerHTML={{ __html: code }} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={5}>
                <Paper className={classes.code}>
                  <Typography color="secondary" variant="inherit">
                    {code}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h4" color="secondary" paragraph>
                  Instructions
                </Typography>
                <ol>
                  <li>Setup the widget on this page</li>
                  <li>Copy the code</li>
                  <li>Place the widget code on your website</li>
                </ol>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
