import _ from 'lodash'
import React, { forwardRef, Ref, useState } from 'react'
import { MenuItem } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { useUser } from 'components/hooks/useUser'
import UploadSlotDialog, { WizardProvider } from 'components/slots/form/upload/UploadSlotDialog'

type UploadSlotsMenuItemProps = {
  onSuccess?: () => void
}
const UploadSlotsMenuItem = ({ onSuccess }: UploadSlotsMenuItemProps, ref: Ref<HTMLElement>) => {
  const { can } = useUser()
  const { t } = useTranslation(Domain.Forms)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <WizardProvider steps={1}>
      <MenuItem
        disabled={!can.createSlots}
        innerRef={ref}
        role="menu"
        color="secondary"
        onClick={() => setModalOpen(true)}>
        {t('import_slot_csv')}
      </MenuItem>
      <UploadSlotDialog
        open={modalOpen}
        onSuccess={onSuccess}
        onClose={() => setModalOpen(false)}
      />
    </WizardProvider>
  )
}
export default forwardRef<HTMLElement, UploadSlotsMenuItemProps>(UploadSlotsMenuItem)
