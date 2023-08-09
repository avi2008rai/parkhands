import React, { useState, useCallback } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import WishToParkSuccess from './WishToParkSuccess'

export default function WishToParkButton(props: ButtonProps) {
  const { t } = useTranslation(Domain.General)
  const [open, setOpen] = useState(false)
  const openDialog = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <>
      <Button {...props} onClick={openDialog}>
        {t('wish_park_here')}
      </Button>
      <WishToParkSuccess open={open} onClose={closeDialog} />
    </>
  )
}
