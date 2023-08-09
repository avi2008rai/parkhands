import _ from 'lodash'
import React, { forwardRef, Ref, useState } from 'react'
import { MenuItem } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { useUser } from 'components/hooks/useUser'
import WizardSlotDialog, { WizardProvider } from 'components/slots/form/wizard/WizardSlotDialog'

type CreateSlotMenuItemProps = {
  onSuccess?: () => void
}
const CreateSlotMenuItem = ({ onSuccess }: CreateSlotMenuItemProps, ref: Ref<HTMLElement>) => {
  const { can } = useUser()
  const { t } = useTranslation(Domain.Forms)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <WizardProvider steps={5}>
      <MenuItem
        disabled={!can.createSlots}
        innerRef={ref}
        role="menu"
        color="secondary"
        onClick={() => setModalOpen(true)}>
        {t('Add parking slot')}
      </MenuItem>
      <WizardSlotDialog
        open={modalOpen}
        onSuccess={onSuccess}
        onClose={() => setModalOpen(false)}
      />
    </WizardProvider>
  )
}
export default forwardRef<HTMLElement, CreateSlotMenuItemProps>(CreateSlotMenuItem)
