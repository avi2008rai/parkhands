import React from 'react'
import { useRouter } from 'next/router'
import { MenuItem } from '@material-ui/core'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import { useUser } from 'components/hooks/useUser'
import useConfirm from 'components/hooks/useConfirm'
import ConfirmDialog from 'components/common/form/ConfirmDialog'
import { useDeleteAccountMutation } from 'gql/schema'

const DeleteAccountButton = ({ itemRef }: React.PropsWithRef<any>) => {
  const t = useDomain(Domain.Forms)
  const { userId } = useUser()
  const router = useRouter()
  const [deleteAccount] = useDeleteAccountMutation()
  const { open, openHandler, closeHandler, confirmHandler } = useConfirm({
    onClose: () => {},
    onConfirm: async () => {
      try {
        await deleteAccount({ variables: { id: userId } })
        router.push(routes.logout)
      } catch (error) {
        console.error(error)
      }
    },
  })
  return (
    <>
      <MenuItem ref={itemRef} dense onClick={openHandler}>
        {t('delete_account')}
      </MenuItem>
      <ConfirmDialog
        dialogTitle={t('closing_your_account')}
        dialogContent="message_confirm_close_account"
        {...{ open, closeHandler, confirmHandler }}
      />
    </>
  )
}

export default React.forwardRef((props, ref) => <DeleteAccountButton itemRef={ref} {...props} />)
