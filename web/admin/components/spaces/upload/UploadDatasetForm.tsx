import _ from 'lodash'
import { CloudUpload } from '@material-ui/icons'
import React, { useState, useCallback, useMemo } from 'react'
import { Polygon, Point, FeatureCollection, BBox } from 'geojson'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid, CircularProgress, Button, Input, Paper } from '@material-ui/core'

import routes from 'common/routes'
import { FormError } from 'components/common/form'
import { useUserContext } from 'components/hooks/useUserContext'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: { display: 'none' },
    label: {},
    paper: {
      width: '100%',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
    block: {
      width: '100%',
      padding: theme.spacing(2),
    },
  }),
)

type Shape = Polygon
type Slot = {
  location: Point
  shape: Shape
  type: 'normal'
}
type Block = {
  area: number
  capacity: number
  shape: Shape
  slots: Slot[]
}
type Ramp = FeatureCollection & { bbox?: BBox }
type Space = {
  area: number
  blocks: Block[]
  entry_ramps: Ramp
  exit_ramps: Ramp
  id: number
  review_state: 'accepted' | 'unreviewed'
  shape: Shape
  source: string
  type: 'ground'
}
type Response = {
  last_modified: Date
  slot_count: number
  space_count: number
  spaces: Space[]
  version: string
}

export default function UploadDatasetForm() {
  const { t } = useTranslation(Domain.General)
  const classes = useStyles()
  const { jwtToken, currentUser } = useUserContext()
  const [error, setError] = useState<string | null>(null)
  const [uploadPending, setUploadPending] = useState(false)
  const headers = useMemo(() => ({ Authorization: `Bearer ${jwtToken}` }), [jwtToken])
  const [response, setResponse] = useState<Response | null>(null)

  const onPickFileHandler = useCallback(
    async (event) => {
      event.persist() // persist the synthetic event so we can clear the file input
      setError(null)
      const selectedFile = _.get(event, 'target.files[0]')
      console.log(['here'])
      if (!selectedFile) return
      setUploadPending(true)
      const body = new FormData()
      body.append('file', selectedFile)
      body.append('ownerId', currentUser?.id || '')
      try {
        const response = await fetch(routes.slots.api.uploadDataset, {
          method: 'POST',
          body,
          headers,
        })
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setResponse(responseData)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setUploadPending(false)
        event.target.value = null // reset file input so it can be used again
      }
    },
    [setUploadPending, setError, headers, error],
  )

  return (
    <Grid container justify="space-between" spacing={5}>
      <Grid item xs={12}>
        <label htmlFor="upload-dataset" className={classes.label}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={
              uploadPending ? <CircularProgress color="secondary" size="1rem" /> : <CloudUpload />
            }>
            {t('upload')}
          </Button>
          <Input
            id="upload-dataset"
            type="file"
            name="photoUrlFile"
            className={classes.input}
            onChange={onPickFileHandler}
            inputProps={{ accept: 'application/json' }}
          />
        </label>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <FormError error={error} />
        </Grid>
      )}
      {_.map(response?.spaces, (space) => (
        <Paper className={classes.paper}>
          <Grid item xs={12} key={space.id}>
            <Grid container spacing={2} direction="row">
              <Grid item xs={4}>
                {t('space_id')} {space.id}
                <br />
                {t('review')} {space.review_state}
                <br />
                {t('entry')} {space.entry_ramps ? 'Yes' : 'No'}
                <br />
                {t('exit')} {space.exit_ramps ? 'Yes' : 'No'}
              </Grid>
              <Grid item xs={8}>
                {_.map(space.blocks, (block, blockIndex) => (
                  <Paper variant="outlined" className={classes.block} key={blockIndex}>
                    {t('capacity')} {block.capacity}
                    <br />
                    {t('area')} {block.area}
                    <br />
                    Slots: {block.slots.length}
                    <br />
                    <br />
                    {_.map(block.slots, (slot, slotIndex) => (
                      <div key={slotIndex}>
                        <Button
                          component="a"
                          color="primary"
                          variant="contained"
                          size="small"
                          target="_blank"
                          href={`https://www.google.com/maps/search/?api=1&query=${slot.location.coordinates[1]},${slot.location.coordinates[0]}&basemap=satellite&layer=transit`}>
                          View in maps
                        </Button>
                      </div>
                    ))}
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Grid>
  )
}
