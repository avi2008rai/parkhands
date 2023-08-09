import _ from 'lodash'
import getConfig from 'next/config'
import React, { useState, useEffect, useCallback } from 'react'
import { Delete } from '@material-ui/icons'
import { useFormContext } from 'react-hook-form'
import { Input, IconButton, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { useUserContext } from 'components/hooks/useUserContext'

const config = getConfig().publicRuntimeConfig
const endpointFiles = `${config.FILE_API_URL}${config.FILE_API_ENDPOINT}`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: { display: 'none' },
    label: { display: 'block' },
    delete: { position: 'absolute', top: -theme.spacing(3), right: -theme.spacing(3) },
    picture: { maxHeight: 450, maxWidth: 450 },
    pictureHolder: { position: 'relative' },
  }),
)

type FileProps = { id: string; initial?: string }

export default function useFilePicker({ id, initial }: FileProps) {
  const classes = useStyles()
  const { jwtToken } = useUserContext()
  const { setValue, setError } = useFormContext()
  const [filename, setFilename] = useState<string | undefined>(initial)
  const [uploadPending, setUploadPending] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const headers = { Authorization: `Bearer ${jwtToken}` }

  const onPickFileHandler = useCallback(
    async (event) => {
      const selectedFile = _.get(event, 'target.files[0]')
      if (!selectedFile) return
      setUploadPending(true)
      const body = new FormData()
      body.append('file', selectedFile)
      try {
        const response = await fetch(endpointFiles, { method: 'POST', body, headers })
        const storage = await response.json()
        setFilename(storage.filename)
      } catch (error) {
        console.error(error)
        setError('photoUrl', 'Unable to process image')
      } finally {
        setUploadPending(false)
      }
    },
    [setFilename, setUploadPending, setError],
  )

  const onDeleteHandler = useCallback(async () => {
    setDeletePending(true)
    try {
      const photoUrl = `${endpointFiles}/${filename}`
      await fetch(photoUrl, { method: 'DELETE', headers })
    } catch (error) {
      console.error(error)
      setError('photoUrl', 'Unable to delete image')
    } finally {
      setDeletePending(false)
      setValue('photoUrl', '')
    }
  }, [filename, setDeletePending, setValue, setError])

  useEffect(() => {
    if (filename) {
      setValue('photoUrl', filename)
    }
  }, [filename])

  return {
    uploadPending,
    deletePending,
    DeleteButton: () => {
      if (!filename) {
        return null
      }

      return (
        <IconButton onClick={onDeleteHandler}>
          {deletePending ? <CircularProgress color="secondary" size="1rem" /> : <Delete />}
        </IconButton>
      )
    },
    FilePicker: () => (
      <Input
        id={id}
        type="file"
        name="photoUrlFile"
        onChange={onPickFileHandler}
        className={classes.input}
        inputProps={{ accept: 'image/*' }}
      />
    ),
    Label: ({ children }: { children: React.ReactNode }) => (
      <label htmlFor={id} className={classes.label}>
        {children}
      </label>
    ),
  }
}
