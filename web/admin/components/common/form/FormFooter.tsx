import React, { PropsWithChildren } from 'react'
import { Grid, Box } from '@material-ui/core'

import ResetButton, { ResetButtonProps } from './ResetButton'
import SubmitButton, { SubmitButtonProps } from './SubmitButton'
import CancelButton, { CancelButtonProps } from './CancelButton'
import DeleteButton, { DeleteButtonProps } from './DeleteButton'
import SaveDuplicateButton, { SaveDuplicateButtonProps } from './SaveDuplicateButton'
export type FormFooterProps = PropsWithChildren<{
  submit?: boolean
  submitProps?: SubmitButtonProps
  reset?: boolean
  resetProps?: ResetButtonProps
  cancel?: boolean
  cancelProps?: CancelButtonProps
  deleteButton?: boolean
  deleteProps?: DeleteButtonProps
  saveDuplicate?: boolean
  saveDuplicateProps?: SaveDuplicateButtonProps
}>

export default function FormFooter({
  children,
  submit,
  submitProps = {},
  reset,
  resetProps = {},
  cancel,
  cancelProps,
  deleteButton,
  deleteProps = {},
  saveDuplicate,
  saveDuplicateProps = {},
}: FormFooterProps) {
  return (
    <Box p={1} width="100%">
      <Grid container justify="flex-end">
      {saveDuplicate && <SaveDuplicateButton {...saveDuplicateProps} />}
        {submit && <SubmitButton {...submitProps} />}
        {reset && <ResetButton {...resetProps} />}
        {children}
        {cancel && cancelProps && <CancelButton {...cancelProps} />}
        {deleteButton && <DeleteButton {...deleteProps} />}
      </Grid>
    </Box>
  )
}
