import _ from 'lodash'
import { ArrowBack } from '@material-ui/icons'
import { useMediaQuery } from '@material-ui/core'
import React, { PropsWithChildren, useMemo } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import DialogHeader from 'components/common/DialogHeader'
import PageDialog, { PageDialogProps } from 'components/common/PageDialog'

import { CloseModalButtonProps } from './CloseModalButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      margin: theme.spacing(0),
    },
    flexDialog: {
      margin: theme.spacing(0),
      height: '100%',
    },
  }),
)

export type ActionDialogProps = PropsWithChildren<
  {
    flex?: boolean
    closeAsBack?: boolean
    headerLabel?: string
  } & PageDialogProps
>
export default function ActionDialog({
  children,
  flex = false,
  closeAsBack = true,
  headerLabel,
  ...props
}: ActionDialogProps) {
  const classes = useStyles()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const closeModalButtonProps = useMemo(
    (): Partial<CloseModalButtonProps> =>
      closeAsBack && mobile
        ? {
            edge: 'start',
            Icon: ArrowBack,
          }
        : {},
    [closeAsBack, mobile],
  )

  const boxProps = flex
    ? { display: 'flex', flexDirection: 'column', className: classes.flexDialog }
    : { className: classes.dialog }

  return (
    <PageDialog closeModalButtonProps={closeModalButtonProps} boxProps={boxProps} {...props}>
      {headerLabel && <DialogHeader title={headerLabel} />}
      {children}
    </PageDialog>
  )
}
