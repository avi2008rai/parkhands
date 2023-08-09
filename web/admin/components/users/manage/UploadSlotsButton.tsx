import _ from 'lodash'
import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'

import UserUploadSlotsDialog from './UserUploadSlotsDialog'

type CreateSlotButtonProps = {
  userId: string
  onSuccess?: () => void
}
export default function UploadSlotsButton({ userId, onSuccess }: CreateSlotButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <IconButton color="primary" title="Upload CSV Slots" onClick={() => setModalOpen(true)}>
        <CloudUpload fontSize="large" />
      </IconButton>
      <UserUploadSlotsDialog
        userId={userId}
        open={modalOpen}
        onSuccess={onSuccess}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
