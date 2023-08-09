import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PhotoCamera } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, CircularProgress, Grid, Card, Grow } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'

import PhotoUrlController from './controller/PhotoUrlController'
import useFilePicker from './useFilePicker'
import SlotImage from '../SlotImage'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: theme.spacing(3) },
    picture: { maxHeight: 450, maxWidth: 450 },
    pictureHolder: { position: 'relative' },
  }),
)

export default function PhotoUrlField() {
  const classes = useStyles()
  const { watch } = useFormContext()
  const { t } = useTranslation(Domain.Forms)

  const photoUrl = watch('photoUrl')
  const { uploadPending, Label, FilePicker, DeleteButton } = useFilePicker({
    id: 'photo-url-file',
    initial: photoUrl,
  })
  return (
    <Card variant="outlined" className={classes.root}>
      <PhotoUrlController />
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grow in={!!photoUrl} mountOnEnter unmountOnExit>
          <div>
            <SlotImage placeholder={false} size="large" photoUrl={photoUrl} />
          </div>
        </Grow>
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Label>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={
                    uploadPending ? (
                      <CircularProgress color="secondary" size="1.5rem" />
                    ) : (
                      <PhotoCamera />
                    )
                  }>
                  {t('upload_picture  ')}
                </Button>
                <FilePicker />
              </Label>
            </Grid>
            {photoUrl && (
              <Grid item>
                <DeleteButton />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
